import { Test, type TestingModule } from '@nestjs/testing';

import { type ObjectRecordUpdateEvent } from 'twenty-shared/database-events';
import {
  FieldMetadataType,
  MetadataReadability,
  type ObjectsPermissionsByRoleId,
} from 'twenty-shared/types';

import { LogicFunctionTriggerJob } from 'src/engine/core-modules/logic-function/logic-function-trigger/jobs/logic-function-trigger.job';
import { CallDatabaseEventTriggerJobsJob } from 'src/engine/core-modules/logic-function/logic-function-trigger/triggers/database-event/call-database-event-trigger-jobs.job';
import { MessageQueue } from 'src/engine/core-modules/message-queue/message-queue.constants';
import { ApplicationRepeatedEventRecorderService } from 'src/engine/core-modules/event-logs/emit/application-repeated-event-recorder.service';
import { ApplicationJobEnqueueThrottlerService } from 'src/engine/core-modules/message-queue/services/application-job-enqueue-throttler.service';
import { getQueueToken } from 'src/engine/core-modules/message-queue/utils/get-queue-token.util';
import { createEmptyFlatEntityMaps } from 'src/engine/metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant';
import { addFlatEntityToFlatEntityMapsOrThrow } from 'src/engine/metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util';
import { getFlatFieldMetadataMock } from 'src/engine/metadata-modules/flat-field-metadata/__mocks__/get-flat-field-metadata.mock';
import { getFlatObjectMetadataMock } from 'src/engine/metadata-modules/flat-object-metadata/__mocks__/get-flat-object-metadata.mock';
import { WorkspaceCacheService } from 'src/engine/workspace-cache/services/workspace-cache.service';
import { type WorkspaceEventBatch } from 'src/engine/workspace-event-emitter/types/workspace-event-batch.type';

const WORKSPACE_ID = 'workspace-id';
const OBJECT_METADATA_ID = 'company-object-id';
const NAME_FIELD_ID = 'name-field-id';
const SALARY_FIELD_ID = 'salary-field-id';
const CITY_FIELD_ID = 'city-field-id';
const APPLICATION_ID = 'application-id';
const APPLICATION_ROLE_ID = 'application-role-id';
const OTHER_APPLICATION_ID = 'other-application-id';
const OTHER_APPLICATION_ROLE_ID = 'other-application-role-id';
const OTHER_LOGIC_FUNCTION_ID = 'other-logic-function-id';
const LOGIC_FUNCTION_ID = 'logic-function-id';
const TRIGGER_JOB_ID = 'trigger-job-id';

const buildMaps = (
  entities: ({ id: string; universalIdentifier: string } & Record<
    string,
    unknown
  >)[],
) =>
  entities.reduce(
    (maps, entity) =>
      addFlatEntityToFlatEntityMapsOrThrow({
        flatEntity: entity as never,
        flatEntityMaps: maps,
      }),
    createEmptyFlatEntityMaps(),
  );

const flatFieldMetadataMaps = buildMaps([
  getFlatFieldMetadataMock({
    id: NAME_FIELD_ID,
    universalIdentifier: NAME_FIELD_ID,
    objectMetadataId: OBJECT_METADATA_ID,
    type: FieldMetadataType.TEXT,
    name: 'name',
  }),
  getFlatFieldMetadataMock({
    id: SALARY_FIELD_ID,
    universalIdentifier: SALARY_FIELD_ID,
    objectMetadataId: OBJECT_METADATA_ID,
    type: FieldMetadataType.NUMBER,
    name: 'salary',
  }),
  getFlatFieldMetadataMock({
    id: CITY_FIELD_ID,
    universalIdentifier: CITY_FIELD_ID,
    objectMetadataId: OBJECT_METADATA_ID,
    type: FieldMetadataType.TEXT,
    name: 'city',
  }),
]);

const buildObjectMetadata = (readability: MetadataReadability) =>
  getFlatObjectMetadataMock({
    id: OBJECT_METADATA_ID,
    universalIdentifier: OBJECT_METADATA_ID,
    nameSingular: 'company',
    namePlural: 'companies',
    applicationId: 'other-application-id',
    readability,
    fieldIds: [NAME_FIELD_ID, SALARY_FIELD_ID, CITY_FIELD_ID],
    fieldUniversalIdentifiers: [NAME_FIELD_ID, SALARY_FIELD_ID, CITY_FIELD_ID],
  });

const buildEvent = (
  recordId: string,
  record: Record<string, unknown>,
  updatedFields = ['name', 'salary'],
): ObjectRecordUpdateEvent =>
  ({
    recordId,
    userId: 'user-id',
    userWorkspaceId: 'user-workspace-id',
    properties: {
      updatedFields,
      before: { id: recordId, ...record, name: 'Old' },
      after: { id: recordId, ...record },
      diff: {
        name: { before: 'Old', after: record.name },
        salary: { before: 0, after: record.salary },
      },
    },
  }) as unknown as ObjectRecordUpdateEvent;

const buildObjectPermissions = ({
  canReadObjectRecords = true,
  restrictedFields = {},
}: {
  canReadObjectRecords?: boolean;
  restrictedFields?: Record<string, { canRead: boolean; canUpdate: boolean }>;
} = {}) => ({
  [OBJECT_METADATA_ID]: {
    canReadObjectRecords,
    canUpdateObjectRecords: false,
    canSoftDeleteObjectRecords: false,
    canDestroyObjectRecords: false,
    restrictedFields,
  },
});

const buildRolesPermissions = (
  options: Parameters<typeof buildObjectPermissions>[0] = {},
): ObjectsPermissionsByRoleId => ({
  [APPLICATION_ROLE_ID]: buildObjectPermissions(options),
});

describe('CallDatabaseEventTriggerJobsJob', () => {
  let job: CallDatabaseEventTriggerJobsJob;
  let messageQueueService: { bulkAdd: jest.Mock };
  let cacheData: Record<string, unknown>;

  const buildBatch = (
    events: ObjectRecordUpdateEvent[],
    readability = MetadataReadability.OPEN,
  ): WorkspaceEventBatch<ObjectRecordUpdateEvent> => ({
    name: 'company.updated',
    workspaceId: WORKSPACE_ID,
    objectMetadata: buildObjectMetadata(readability),
    events,
  });

  const enqueuedPayloads = () =>
    messageQueueService.bulkAdd.mock.calls.flatMap(([, jobs]) =>
      (jobs as { data: { payload: ObjectRecordUpdateEvent } }[]).map(
        (enqueuedJob) => enqueuedJob.data.payload,
      ),
    );

  beforeEach(async () => {
    cacheData = {
      featureFlagsMap: {},
      flatLogicFunctionMaps: buildMaps([
        {
          id: LOGIC_FUNCTION_ID,
          universalIdentifier: LOGIC_FUNCTION_ID,
          workspaceId: WORKSPACE_ID,
          applicationId: APPLICATION_ID,
          databaseEventTriggerSettings: { eventName: 'company.updated' },
          deletedAt: null,
        },
      ]),
      flatApplicationMaps: {
        byId: {
          [APPLICATION_ID]: {
            id: APPLICATION_ID,
            universalIdentifier: 'application-universal-identifier',
            applicationRegistrationId: 'application-registration-id',
            defaultRoleId: APPLICATION_ROLE_ID,
            deletedAt: null,
          },
        },
        idByUniversalIdentifier: {},
      },
      rolesPermissions: buildRolesPermissions(),
      flatFieldMetadataMaps,
      flatFieldMetadataMapsOrm: flatFieldMetadataMaps,
    };

    messageQueueService = { bulkAdd: jest.fn().mockResolvedValue(undefined) };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CallDatabaseEventTriggerJobsJob,
        {
          provide: getQueueToken(MessageQueue.logicFunctionQueue),
          useValue: messageQueueService,
        },
        {
          provide: WorkspaceCacheService,
          useValue: {
            getOrRecompute: jest.fn().mockImplementation(async () => ({
              flatObjectMetadataMaps: { byUniversalIdentifier: {} },
              ...cacheData,
            })),
          },
        },
        {
          provide: ApplicationJobEnqueueThrottlerService,
          useValue: { throttleOrThrow: jest.fn().mockResolvedValue(undefined) },
        },
        {
          provide: ApplicationRepeatedEventRecorderService,
          useValue: { record: jest.fn() },
        },
      ],
    }).compile();

    job = module.get(CallDatabaseEventTriggerJobsJob);
  });

  it('should enqueue the events of an object the application role reads', async () => {
    const event = buildEvent('record-1', { name: 'New', salary: 10 });

    await job.handle(buildBatch([event]), { jobId: TRIGGER_JOB_ID });

    expect(messageQueueService.bulkAdd).toHaveBeenCalledWith(
      LogicFunctionTriggerJob.name,
      [
        {
          data: expect.objectContaining({
            logicFunctionId: LOGIC_FUNCTION_ID,
            workspaceId: WORKSPACE_ID,
            applicationUniversalIdentifier: 'application-universal-identifier',
            userId: 'user-id',
            userWorkspaceId: 'user-workspace-id',
            payload: expect.objectContaining(event),
          }),
          jobId: `${TRIGGER_JOB_ID}.${LOGIC_FUNCTION_ID}.0`,
          workspaceId: WORKSPACE_ID,
          applicationUniversalIdentifier: 'application-universal-identifier',
        },
      ],
      expect.anything(),
    );
  });

  it('should enqueue the same job ids when the trigger job is retried', async () => {
    const batch = buildBatch([
      buildEvent('record-1', { name: 'New', salary: 10 }),
    ]);

    await job.handle(batch, { jobId: TRIGGER_JOB_ID });
    await job.handle(batch, { jobId: TRIGGER_JOB_ID });

    const [firstAttemptJobIds, retryJobIds] =
      messageQueueService.bulkAdd.mock.calls.map(([, jobs]) =>
        (jobs as { jobId: string }[]).map((enqueuedJob) => enqueuedJob.jobId),
      );

    expect(firstAttemptJobIds).toEqual([expect.any(String)]);
    expect(retryJobIds).toEqual(firstAttemptJobIds);
    expect(messageQueueService.bulkAdd.mock.calls[1][2]).toMatchObject({
      doNotCheckDuplicatesBasedOnPrefix: true,
    });
  });

  it('should not enqueue events of an object the application role cannot read', async () => {
    cacheData.rolesPermissions = buildRolesPermissions({
      canReadObjectRecords: false,
    });

    await job.handle(
      buildBatch([buildEvent('record-1', { name: 'New', salary: 10 })]),
      { jobId: TRIGGER_JOB_ID },
    );

    expect(messageQueueService.bulkAdd).not.toHaveBeenCalled();
  });

  it('should not enqueue events for an application without a role', async () => {
    (
      cacheData.flatApplicationMaps as {
        byId: Record<string, { defaultRoleId: string | null }>;
      }
    ).byId[APPLICATION_ID].defaultRoleId = null;

    await job.handle(
      buildBatch([buildEvent('record-1', { name: 'New', salary: 10 })]),
      { jobId: TRIGGER_JOB_ID },
    );

    expect(messageQueueService.bulkAdd).not.toHaveBeenCalled();
  });

  it('should not enqueue events for an application whose role permissions are unknown', async () => {
    cacheData.rolesPermissions = {};

    await job.handle(
      buildBatch([buildEvent('record-1', { name: 'New', salary: 10 })]),
      { jobId: TRIGGER_JOB_ID },
    );

    expect(messageQueueService.bulkAdd).not.toHaveBeenCalled();
  });

  it('should omit the fields the application role cannot read', async () => {
    cacheData.rolesPermissions = buildRolesPermissions({
      restrictedFields: {
        [SALARY_FIELD_ID]: { canRead: false, canUpdate: false },
      },
    });

    await job.handle(
      buildBatch([buildEvent('record-1', { name: 'New', salary: 10 })]),
      { jobId: TRIGGER_JOB_ID },
    );

    expect(enqueuedPayloads()[0].properties).toEqual({
      updatedFields: ['name'],
      before: { id: 'record-1', name: 'Old' },
      after: { id: 'record-1', name: 'New' },
      diff: { name: { before: 'Old', after: 'New' } },
    });
  });

  it('should not enqueue an update touching only fields the application role cannot read', async () => {
    cacheData.rolesPermissions = buildRolesPermissions({
      restrictedFields: {
        [SALARY_FIELD_ID]: { canRead: false, canUpdate: false },
      },
    });

    await job.handle(
      buildBatch([
        buildEvent('record-1', { name: 'Same', salary: 10 }, ['salary']),
      ]),
      { jobId: TRIGGER_JOB_ID },
    );

    expect(messageQueueService.bulkAdd).not.toHaveBeenCalled();
  });

  it('should send a change to the function whose role may read the object, and not to one whose role may not', async () => {
    cacheData.flatLogicFunctionMaps = buildMaps([
      {
        id: LOGIC_FUNCTION_ID,
        universalIdentifier: LOGIC_FUNCTION_ID,
        workspaceId: WORKSPACE_ID,
        applicationId: APPLICATION_ID,
        databaseEventTriggerSettings: { eventName: 'company.updated' },
        deletedAt: null,
      },
      {
        id: OTHER_LOGIC_FUNCTION_ID,
        universalIdentifier: OTHER_LOGIC_FUNCTION_ID,
        workspaceId: WORKSPACE_ID,
        applicationId: OTHER_APPLICATION_ID,
        databaseEventTriggerSettings: { eventName: 'company.updated' },
        deletedAt: null,
      },
    ]);
    (cacheData.flatApplicationMaps as { byId: Record<string, unknown> }).byId[
      OTHER_APPLICATION_ID
    ] = {
      id: OTHER_APPLICATION_ID,
      universalIdentifier: 'other-application-universal-identifier',
      applicationRegistrationId: 'other-application-registration-id',
      defaultRoleId: OTHER_APPLICATION_ROLE_ID,
      deletedAt: null,
    };
    cacheData.rolesPermissions = {
      [APPLICATION_ROLE_ID]: buildObjectPermissions(),
      [OTHER_APPLICATION_ROLE_ID]: buildObjectPermissions({
        canReadObjectRecords: false,
      }),
    };

    await job.handle(
      buildBatch([buildEvent('record-1', { name: 'New', salary: 10 })]),
      { jobId: TRIGGER_JOB_ID },
    );

    expect(
      messageQueueService.bulkAdd.mock.calls.flatMap(([, jobs]) =>
        (jobs as { data: { logicFunctionId: string } }[]).map(
          (enqueuedJob) => enqueuedJob.data.logicFunctionId,
        ),
      ),
    ).toEqual([LOGIC_FUNCTION_ID]);
  });

  it('should send every change of a private object to a role that may read it', async () => {
    await job.handle(
      buildBatch(
        [
          buildEvent('record-1', { name: 'A', salary: 1 }),
          buildEvent('record-2', { name: 'B', salary: 2 }),
        ],
        MetadataReadability.PRIVATE,
      ),
      { jobId: TRIGGER_JOB_ID },
    );

    expect(enqueuedPayloads().map((payload) => payload.recordId)).toEqual([
      'record-1',
      'record-2',
    ]);
  });
});
