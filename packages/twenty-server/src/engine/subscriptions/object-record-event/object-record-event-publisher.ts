import { Injectable, Logger } from '@nestjs/common';

import { QUERY_MAX_RECORDS_FROM_RELATION } from 'twenty-shared/constants';
import { type ObjectRecordEvent } from 'twenty-shared/database-events';
import {
  Nullable,
  ObjectRecord,
  type ObjectsPermissions,
  type ObjectsPermissionsByRoleId,
} from 'twenty-shared/types';
import { isDefined, isRecordGqlOperationSignature } from 'twenty-shared/utils';
import { FindOptionsRelations, ObjectLiteral } from 'typeorm';

import { ProcessNestedRelationsHelper } from 'src/engine/api/common/common-nested-relations-processor/process-nested-relations.helper';
import { CommonSelectFieldsBuilder } from 'src/engine/api/common/common-select-fields/common-select-fields-builder';
import { GraphqlQueryParser } from 'src/engine/api/graphql/graphql-query-runner/graphql-query-parsers/graphql-query.parser';
import { type FlatApplicationCacheMaps } from 'src/engine/core-modules/application/types/flat-application-cache-maps.type';
import { findActiveFlatApplicationById } from 'src/engine/core-modules/application/utils/find-active-flat-application-by-id.util';
import { type SerializableAuthContext } from 'src/engine/core-modules/auth/types/serializable-auth-context.type';
import { type WorkspaceAuthContext } from 'src/engine/core-modules/auth/types/workspace-auth-context.type';
import { WorkspaceManyOrAllFlatEntityMapsCacheService } from 'src/engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service';
import { type FlatEntityMaps } from 'src/engine/metadata-modules/flat-entity/types/flat-entity-maps.type';
import { type FlatFieldMetadata } from 'src/engine/metadata-modules/flat-field-metadata/types/flat-field-metadata.type';
import { type FlatObjectMetadata } from 'src/engine/metadata-modules/flat-object-metadata/types/flat-object-metadata.type';
import { UserWorkspaceRoleMap } from 'src/engine/metadata-modules/role-target/types/user-workspace-role-map.type';
import {
  buildFilterFieldsByKey,
  isEventOutsideQueryFilter,
} from 'src/engine/subscriptions/object-record-event/utils/is-event-outside-query-filter.util';
import { omitRestrictedFieldsFromEvent } from 'src/engine/metadata-modules/permissions/utils/omit-restricted-fields-from-event.util';
import { EventStreamService } from 'src/engine/subscriptions/event-stream.service';
import { SubscriptionService } from 'src/engine/subscriptions/subscription.service';
import {
  type EventStreamData,
  type RecordOrMetadataGqlOperationSignature,
} from 'src/engine/subscriptions/types/event-stream-data.type';
import { type EventStreamPayload } from 'src/engine/subscriptions/types/event-stream-payload.type';
import { ObjectRecordSubscriptionEvent } from 'src/engine/subscriptions/types/object-record-subscription-event.type';
import {
  RolePermissionConfig,
  RoleIdsBySource,
} from 'src/engine/twenty-orm/types/role-permission-config.type';
import { computePermissionIntersection } from 'src/engine/twenty-orm/utils/compute-permission-intersection.util';
import { buildUserRoleIdsBySource } from 'src/engine/twenty-orm/utils/build-user-role-ids-by-source.util';
import { getRoleIdsToIntersect } from 'src/engine/twenty-orm/utils/get-role-ids-to-intersect.util';
import { buildRowAccessPolicy } from 'src/engine/twenty-orm/utils/build-row-access-policy.util';
import { WorkspaceCacheService } from 'src/engine/workspace-cache/services/workspace-cache.service';
import { WorkspaceEventBatch } from 'src/engine/workspace-event-emitter/types/workspace-event-batch.type';
import { parseEventNameOrThrow } from 'src/engine/workspace-event-emitter/utils/parse-event-name';

type StreamPermissionsContext = {
  flatFieldMetadataMaps: FlatEntityMaps<FlatFieldMetadata>;
  flatObjectMetadataMaps: FlatEntityMaps<FlatObjectMetadata>;
  userWorkspaceRoleMap: UserWorkspaceRoleMap;
  rolesPermissions: ObjectsPermissionsByRoleId;
  flatApplicationMaps: FlatApplicationCacheMaps;
};

@Injectable()
export class ObjectRecordEventPublisher {
  private readonly logger = new Logger(ObjectRecordEventPublisher.name);

  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly eventStreamService: EventStreamService,
    private readonly workspaceCacheService: WorkspaceCacheService,
    private readonly processNestedRelationsHelper: ProcessNestedRelationsHelper,
    private readonly workspaceManyOrAllFlatEntityMapsCacheService: WorkspaceManyOrAllFlatEntityMapsCacheService,
    private readonly commonSelectFieldsBuilder: CommonSelectFieldsBuilder,
  ) {}

  async publish(
    eventBatch: WorkspaceEventBatch<ObjectRecordEvent>,
  ): Promise<void> {
    const workspaceId = eventBatch.workspaceId;

    const activeStreamIds =
      await this.eventStreamService.getActiveStreamIds(workspaceId);

    if (activeStreamIds.length === 0) {
      return;
    }

    const streamsData = await this.eventStreamService.getStreamsData(
      workspaceId,
      activeStreamIds,
    );

    const permissionsContext = await this.fetchPermissionsContext(workspaceId);

    const streamIdsToRemove: string[] = [];

    for (const [streamChannelId, streamData] of streamsData) {
      if (!isDefined(streamData)) {
        streamIdsToRemove.push(streamChannelId);
        continue;
      }

      if (Object.keys(streamData.queries).length === 0) {
        continue;
      }

      await this.processObjectRecordStreamEvents({
        streamChannelId,
        streamData,
        workspaceEventBatch: eventBatch,
        permissionsContext,
      });
    }

    await this.eventStreamService.removeFromActiveStreams(
      workspaceId,
      streamIdsToRemove,
    );
  }

  private async processObjectRecordStreamEvents({
    streamChannelId,
    streamData,
    workspaceEventBatch,
    permissionsContext,
  }: {
    streamChannelId: string;
    streamData: EventStreamData;
    workspaceEventBatch: WorkspaceEventBatch<ObjectRecordEvent>;
    permissionsContext: StreamPermissionsContext;
  }): Promise<void> {
    const rolePermissionConfig = this.resolveStreamRolePermissionConfig(
      streamData.authContext,
      permissionsContext,
    );
    const roleIds = isDefined(rolePermissionConfig)
      ? getRoleIdsToIntersect(rolePermissionConfig.intersectionOf)
      : null;

    if (!isDefined(rolePermissionConfig) || !isDefined(roleIds)) {
      return;
    }

    const objectsPermissions = this.resolveStreamObjectsPermissions(
      roleIds,
      permissionsContext.rolesPermissions,
    );

    if (!isDefined(objectsPermissions)) {
      return;
    }

    const objectNameSingular = workspaceEventBatch.objectMetadata.nameSingular;

    if (
      !Object.values(streamData.queries).some(
        (operationSignature) =>
          isRecordGqlOperationSignature(operationSignature) &&
          operationSignature.objectNameSingular === objectNameSingular,
      )
    ) {
      return;
    }

    const matchedEvents: {
      queryIds: string[];
      objectRecordEvent: ObjectRecordSubscriptionEvent;
    }[] = [];

    const fieldsByKey = buildFilterFieldsByKey({
      objectMetadata: workspaceEventBatch.objectMetadata,
      flatFieldMetadataMaps: permissionsContext.flatFieldMetadataMaps,
    });

    // The role decides for every record of the object alike
    if (
      buildRowAccessPolicy({
        subject: {
          isSystemContext: false,
          objectsPermissions,
          isOwningApplication: (objectMetadata) =>
            isDefined(objectMetadata.applicationId) &&
            streamData.authContext.applicationId ===
              objectMetadata.applicationId,
        },
        flatObjectMetadata: workspaceEventBatch.objectMetadata,
        operationType: 'select',
      }).kind === 'denied'
    ) {
      return;
    }

    for (const event of workspaceEventBatch.events) {
      const { action } = parseEventNameOrThrow(workspaceEventBatch.name);

      const eventWithObjectName: ObjectRecordSubscriptionEvent = {
        action,
        objectNameSingular,
        ...event,
      };

      const filteredEvent = omitRestrictedFieldsFromEvent({
        event: eventWithObjectName,
        objectMetadata: workspaceEventBatch.objectMetadata,
        objectsPermissions,
        flatObjectMetadataMaps: permissionsContext.flatObjectMetadataMaps,
        flatFieldMetadataMaps: permissionsContext.flatFieldMetadataMaps,
      });

      const filteredProperties = filteredEvent.properties as {
        updatedFields?: string[];
      };

      if (
        isDefined(filteredProperties.updatedFields) &&
        filteredProperties.updatedFields.length === 0
      ) {
        continue;
      }

      const matchedQueryIds = this.getMatchingObjectRecordQueryIds({
        queries: streamData.queries,
        event: filteredEvent,
        fieldsByKey,
      });

      if (matchedQueryIds.length === 0) {
        continue;
      }

      matchedEvents.push({
        queryIds: matchedQueryIds,
        objectRecordEvent: filteredEvent,
      });
    }

    if (matchedEvents.length > 0) {
      try {
        await this.enrichEventBatchWithNestedRelations({
          objectMetadata: workspaceEventBatch.objectMetadata,
          events: matchedEvents.map(
            (matchedEvent) => matchedEvent.objectRecordEvent,
          ),
          streamData,
          workspaceId: workspaceEventBatch.workspaceId,
          rolePermissionConfig,
          objectsPermissions,
        });
      } catch (error) {
        this.logger.warn(
          `Failed to enrich nested relations for ${workspaceEventBatch.name} subscription event, broadcasting without them: ${
            error instanceof Error ? error.message : String(error)
          }`,
          error instanceof Error ? error.stack : undefined,
        );
      }

      const payload: EventStreamPayload = {
        objectRecordEventsWithQueryIds: matchedEvents,
        metadataEvents: [],
      };

      await this.subscriptionService.publishToEventStream({
        workspaceId: workspaceEventBatch.workspaceId,
        eventStreamChannelId: streamChannelId,
        payload,
      });
    }
  }

  private async enrichEventBatchWithNestedRelations({
    streamData,
    objectMetadata,
    events,
    workspaceId,
    rolePermissionConfig,
    objectsPermissions,
  }: {
    streamData: EventStreamData;
    objectMetadata: FlatObjectMetadata;
    events: ObjectRecordEvent[];
    workspaceId: string;
    rolePermissionConfig: RolePermissionConfig;
    objectsPermissions: ObjectsPermissions;
  }) {
    const { flatFieldMetadataMaps, flatObjectMetadataMaps } =
      await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps(
        {
          workspaceId,
          flatMapsKeys: ['flatObjectMetadataMaps', 'flatFieldMetadataMaps'],
        },
      );

    const allRecords: ObjectRecord[] = [];

    for (const event of events) {
      if ('before' in event.properties) {
        const recordBefore = event.properties.before as Nullable<ObjectRecord>;

        if (isDefined(recordBefore)) {
          allRecords.push(recordBefore);
        }
      }

      if ('after' in event.properties) {
        const recordAfter = event.properties.after as Nullable<ObjectRecord>;

        if (isDefined(recordAfter)) {
          allRecords.push(recordAfter);
        }
      }
    }

    const { selectedFields } = this.commonSelectFieldsBuilder.buildFromDepth({
      depth: 1,
      flatObjectMetadata: objectMetadata,
      flatObjectMetadataMaps,
      flatFieldMetadataMaps,
      objectsPermissions,
      onlyUseLabelIdentifierFieldsInRelations: true,
      recurseIntoJunctionTableRelations: true,
    });

    const commonQueryParser = new GraphqlQueryParser(
      objectMetadata,
      flatObjectMetadataMaps,
      flatFieldMetadataMaps,
    );

    const selectedFieldsResult =
      commonQueryParser.parseSelectedFields(selectedFields);

    await this.processNestedRelationsHelper.processNestedRelations({
      flatObjectMetadataMaps,
      flatFieldMetadataMaps,
      parentObjectMetadataItem: objectMetadata,
      parentObjectRecords: allRecords,
      authContext: streamData.authContext as unknown as WorkspaceAuthContext,
      limit: QUERY_MAX_RECORDS_FROM_RELATION,
      rolePermissionConfig,
      relations: selectedFieldsResult.relations as Record<
        string,
        FindOptionsRelations<ObjectLiteral>
      >,
      selectedFields: selectedFieldsResult.select,
    });
  }

  private resolveStreamRolePermissionConfig(
    subscriberAuthContext: SerializableAuthContext,
    permissionsContext: Pick<
      StreamPermissionsContext,
      'userWorkspaceRoleMap' | 'flatApplicationMaps'
    >,
  ): { intersectionOf: RoleIdsBySource } | undefined {
    const { userWorkspaceId, applicationId } = subscriberAuthContext;

    if (!isDefined(userWorkspaceId)) {
      return undefined;
    }

    const userRoleId = permissionsContext.userWorkspaceRoleMap[userWorkspaceId];

    if (!isDefined(applicationId)) {
      return {
        intersectionOf: buildUserRoleIdsBySource({
          userRoleId,
          application: undefined,
        }),
      };
    }

    // The cache keeps soft-deleted applications; a gone one must not fall back to the user alone and widen the stream
    const application = findActiveFlatApplicationById(
      permissionsContext.flatApplicationMaps,
      applicationId,
    );

    if (!isDefined(application)) {
      return undefined;
    }

    return {
      intersectionOf: buildUserRoleIdsBySource({
        userRoleId,
        application,
      }),
    };
  }

  private resolveStreamObjectsPermissions(
    roleIds: string[],
    rolesPermissions: ObjectsPermissionsByRoleId,
  ): ObjectsPermissions | undefined {
    const allRolePermissions = roleIds.map(
      (roleId) => rolesPermissions[roleId],
    );

    if (!allRolePermissions.every(isDefined)) {
      return undefined;
    }

    return computePermissionIntersection(allRolePermissions);
  }

  private getMatchingObjectRecordQueryIds({
    queries,
    event,
    fieldsByKey,
  }: {
    queries: Record<string, RecordOrMetadataGqlOperationSignature>;
    event: ObjectRecordSubscriptionEvent;
    fieldsByKey: ReturnType<typeof buildFilterFieldsByKey>;
  }): string[] {
    const properties = event.properties as {
      after?: object;
      before?: object;
    };

    if (!isDefined(properties?.after ?? properties?.before)) {
      return [];
    }

    return Object.entries(queries)
      .filter(
        ([, operationSignature]) =>
          isRecordGqlOperationSignature(operationSignature) &&
          operationSignature.objectNameSingular === event.objectNameSingular &&
          !isEventOutsideQueryFilter({
            properties,
            filter: operationSignature.variables?.filter,
            fieldsByKey,
          }),
      )
      .map(([queryId]) => queryId);
  }

  private async fetchPermissionsContext(
    workspaceId: string,
  ): Promise<StreamPermissionsContext> {
    const {
      flatFieldMetadataMaps,
      flatObjectMetadataMaps,
      userWorkspaceRoleMap,
      rolesPermissions,
      flatApplicationMaps,
    } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
      'flatFieldMetadataMaps',
      'flatObjectMetadataMaps',
      'userWorkspaceRoleMap',
      'rolesPermissions',
      'flatApplicationMaps',
    ]);

    return {
      flatFieldMetadataMaps,
      flatObjectMetadataMaps,
      userWorkspaceRoleMap,
      rolesPermissions,
      flatApplicationMaps,
    };
  }
}
