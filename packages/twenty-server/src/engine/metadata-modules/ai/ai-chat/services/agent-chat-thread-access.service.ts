import { STANDARD_OBJECTS } from 'twenty-shared/metadata';
import { AuthException } from 'src/engine/core-modules/auth/auth.exception';
import { randomUUID } from 'node:crypto';
import { hasAgentChatThreadChannelField } from 'src/engine/metadata-modules/ai/ai-chat/utils/has-agent-chat-thread-channel-field.util';
import { getAgentChatThreadParticipantTable } from 'src/engine/metadata-modules/ai/ai-chat/utils/get-agent-chat-thread-participant-table.util';
import { Injectable } from '@nestjs/common';
import chunk from 'lodash.chunk';

import { PermissionFlagType } from 'twenty-shared/constants';
import { isDefined } from 'twenty-shared/utils';

import { type UserWorkspaceAuthContext } from 'src/engine/core-modules/auth/types/workspace-auth-context.type';
import { UserWorkspaceAuthContextService } from 'src/engine/core-modules/user-workspace/services/user-workspace-auth-context.service';
import { type AgentChatThreadAccessArgs } from 'src/engine/metadata-modules/ai/ai-chat/types/agent-chat-thread-access-args.type';
import { findAgentChatFlatObjectMetadata } from 'src/engine/metadata-modules/ai/ai-chat/utils/find-agent-chat-flat-object-metadata.util';
import { lockAgentChatChannelForThreadWriteOrThrow } from 'src/engine/metadata-modules/ai/ai-chat/utils/lock-agent-chat-channel-for-thread-write-or-throw.util';
import { throwAgentChatThreadNotFound } from 'src/engine/metadata-modules/ai/ai-chat/utils/throw-agent-chat-thread-not-found.util';
import { AgentMessageRole } from 'src/engine/metadata-modules/ai/ai-history/enums/agent-message-role.enum';
import { AgentChatThreadWorkspaceEntity } from 'src/engine/metadata-modules/ai/ai-history/standard-objects/agent-chat-thread.workspace-entity';
import { InjectAgentHistoryRepository } from 'src/engine/metadata-modules/ai/ai-history/repositories/inject-agent-history-repository.decorator';
import { AgentHistoryRepository } from 'src/engine/metadata-modules/ai/ai-history/repositories/agent-history-repository';
import { type AgentHistoryStorageContext } from 'src/engine/metadata-modules/ai/ai-history/services/agent-history-workspace-storage.service';
import {
  AiException,
  AiExceptionCode,
} from 'src/engine/metadata-modules/ai/ai.exception';
import { PermissionsService } from 'src/engine/metadata-modules/permissions/permissions.service';
import { type OperationType } from 'src/engine/twenty-orm/repository/permissions.utils';
import { WorkspaceOrmManager } from 'src/engine/twenty-orm/workspace-orm.manager';
import { WorkspaceCacheService } from 'src/engine/workspace-cache/services/workspace-cache.service';

const READABLE_THREAD_IDS_BATCH_SIZE = 1000;

@Injectable()
export class AgentChatThreadAccessService {
  constructor(
    @InjectAgentHistoryRepository('agentChatThread')
    private readonly threadRepository: AgentHistoryRepository<AgentChatThreadWorkspaceEntity>,
    private readonly userAuthContextService: UserWorkspaceAuthContextService,
    private readonly workspaceCacheService: WorkspaceCacheService,
    private readonly permissionsService: PermissionsService,
    private readonly workspaceOrmManager: WorkspaceOrmManager,
  ) {}

  // TODO(@FelixMalfait): remove once 2.51 leaves the cross-upgrade window. Until
  // the 2.51 channels command reaches a workspace, its chats have no channel column
  async hasChannels(workspaceId: string): Promise<boolean> {
    const { flatFieldMetadataMaps } =
      await this.workspaceCacheService.getOrRecompute(workspaceId, [
        'flatFieldMetadataMaps',
      ]);

    return hasAgentChatThreadChannelField({ flatFieldMetadataMaps });
  }

  // TODO(@bosiraphael): remove once 2.54 leaves the cross-upgrade window
  async assertHasMentionResolutionOrThrow(workspaceId: string): Promise<void> {
    const { flatFieldMetadataMaps } =
      await this.workspaceCacheService.getOrRecompute(workspaceId, [
        'flatFieldMetadataMaps',
      ]);

    if (
      !isDefined(
        flatFieldMetadataMaps.byUniversalIdentifier[
          STANDARD_OBJECTS.agentChatThreadParticipant.fields.mentionsResolvedAt
            .universalIdentifier
        ],
      )
    ) {
      throw new AiException(
        'Chats are not available until this workspace finishes upgrading',
        AiExceptionCode.CHAT_UPGRADE_IN_PROGRESS,
      );
    }
  }

  async isThreadWritableByRole({
    workspaceId,
    roleId,
  }: {
    workspaceId: string;
    roleId: string;
  }): Promise<boolean> {
    const [objectMetadata, { rolesPermissions }] = await Promise.all([
      this.getThreadObjectMetadata(workspaceId),
      this.workspaceCacheService.getOrRecompute(workspaceId, [
        'rolesPermissions',
      ]),
    ]);

    return (
      rolesPermissions[roleId]?.[objectMetadata.id]?.canUpdateObjectRecords ===
      true
    );
  }

  getReadableThread(args: AgentChatThreadAccessArgs) {
    return this.getThreadWithAccess({ ...args, operationType: 'select' });
  }

  async getThreadWithAccess({
    operationType,
    ...args
  }: AgentChatThreadAccessArgs & {
    operationType: OperationType;
  }) {
    const authContext = await this.getAuthContext(args);
    const thread = await this.threadRepository.findOne(args.workspaceId, {
      where: { id: args.threadId },
    });
    if (!isDefined(thread)) {
      return throwAgentChatThreadNotFound();
    }
    await this.workspaceOrmManager.executeInWorkspaceContext(
      () => this.assertOperationAllowed(args.threadId, operationType),
      authContext,
    );
    return thread;
  }

  async findReadableThreadIds({
    threadIds,
    ...args
  }: Omit<AgentChatThreadAccessArgs, 'threadId'> & {
    threadIds: string[];
  }): Promise<string[]> {
    if (threadIds.length === 0) {
      return [];
    }

    const authContext = await this.getAuthContext(args);

    // Each id is a query parameter, so a long chat history is checked in
    // batches that stay well under PostgreSQL's parameter limit
    return this.workspaceOrmManager.executeInWorkspaceContext(async () => {
      const repository =
        this.workspaceOrmManager.getRepositoryWithContextPermissions(
          'agentChatThread',
        );
      const readableThreadIds: string[] = [];

      for (const threadIdBatch of chunk(
        threadIds,
        READABLE_THREAD_IDS_BATCH_SIZE,
      )) {
        readableThreadIds.push(
          ...(await repository.findRecordIdsAllowedForOperation({
            recordIds: threadIdBatch,
            operationType: 'select',
            withDeleted: true,
          })),
        );
      }

      return readableThreadIds;
    }, authContext);
  }

  // The members, among those given, whose role lets them reply in the chat
  async findMembersWhoCanReply({
    memberIds,
    ...args
  }: AgentChatThreadAccessArgs & {
    memberIds: string[];
  }): Promise<string[]> {
    return this.filterMemberIds(memberIds, (memberId) =>
      this.getThreadWithAccess({
        ...args,
        workspaceMemberId: memberId,
        operationType: 'update',
      }).then(() => true),
    );
  }

  async createThread(args: {
    workspaceId: string;
    workspaceMemberId: string;
    id?: string;
    title?: string;
    // filed under done for its owner, until activity brings it back to their inbox
    isArchived?: boolean;
    isSubscribed?: boolean;
    // checked by the caller, as the member must be able to reach it
    channelId?: string;
  }): Promise<AgentChatThreadWorkspaceEntity> {
    const authContext = await this.getAuthContext(args);

    await this.assertHasMentionResolutionOrThrow(args.workspaceId);
    await this.validateThreadCreationIsPermitted({
      authContext,
      updatedColumns: isDefined(args.title) ? ['title'] : [],
    });

    return this.threadRepository.query(
      args.workspaceId,
      async ({ manager, table }) => {
        if (isDefined(args.channelId)) {
          await lockAgentChatChannelForThreadWriteOrThrow({
            manager,
            workspaceId: args.workspaceId,
            channelId: args.channelId,
          });
        }
        const records = await manager.query<AgentChatThreadWorkspaceEntity[]>(
          `INSERT INTO ${table('agentChatThread')} (id, title, "workspaceMemberId"${isDefined(args.channelId) ? ', "channelId"' : ''})
           VALUES ($1, $2, $3${isDefined(args.channelId) ? ', $4' : ''}) RETURNING *`,
          [
            args.id ?? randomUUID(),
            args.title ?? null,
            authContext.workspaceMemberId,
            ...(isDefined(args.channelId) ? [args.channelId] : []),
          ],
        );
        const record = records[0];
        const [setUpRecord] = await this.setUpCreatedThreadsInboxState({
          manager,
          table,
          workspaceId: args.workspaceId,
          workspaceMemberId: authContext.workspaceMemberId,
          threadIds: [record.id],
          isArchived: args.isArchived,
          isSubscribed: args.isSubscribed,
        });
        return setUpRecord ?? record;
      },
    );
  }

  private validateThreadCreationIsPermitted({
    authContext,
    updatedColumns,
  }: {
    authContext: UserWorkspaceAuthContext;
    updatedColumns: string[];
  }): Promise<void> {
    return this.workspaceOrmManager.executeInWorkspaceContext(
      () =>
        this.workspaceOrmManager
          .getRepositoryWithContextPermissions('agentChatThread')
          .validateWriteIsPermitted({
            operationType: 'insert',
            columnsToReturn: ['id'],
            updatedColumns,
          }),
      authContext,
    );
  }

  async claimUnownedThreadForRun(
    args: AgentChatThreadAccessArgs,
  ): Promise<AgentChatThreadWorkspaceEntity | null> {
    const authContext = await this.getAuthContext(args);

    await this.validateThreadCreationIsPermitted({
      authContext,
      updatedColumns: [],
    });

    await this.assertHasMentionResolutionOrThrow(args.workspaceId);

    return this.threadRepository.query(
      args.workspaceId,
      async ({ manager, table }) => {
        const [thread] = await manager.query<AgentChatThreadWorkspaceEntity[]>(
          `WITH claimed_thread AS (
             UPDATE ${table('agentChatThread')}
             SET "workspaceMemberId" = $2,
                 "lastActivityAt" = COALESCE("lastActivityAt", clock_timestamp())
             WHERE id = $1
               AND "workspaceMemberId" IS NULL
               AND NOT EXISTS (
                 SELECT 1 FROM ${table('agentMessage')}
                 WHERE "threadId" = $1
                   AND role = $3
                   AND "senderWorkspaceMemberId" IS DISTINCT FROM $2
               )
             RETURNING *
           )
           SELECT * FROM claimed_thread`,
          [args.threadId, authContext.workspaceMemberId, AgentMessageRole.USER],
        );

        if (!isDefined(thread)) {
          return null;
        }

        await manager.query(
          `INSERT INTO ${getAgentChatThreadParticipantTable(args.workspaceId)} ("threadId", "workspaceMemberId", "lastReadAt", "isSubscribed")
           VALUES ($1, $2, clock_timestamp(), false)
           ON CONFLICT ("threadId", "workspaceMemberId") DO NOTHING`,
          [thread.id, authContext.workspaceMemberId],
        );

        return thread;
      },
    );
  }

  // A new thread sorts by its creation and starts read in its creator's
  // inbox. Threads already set up keep their state, so an upsert of an
  // existing thread through the record API cannot reset it.
  async setUpCreatedThreadsInboxState({
    manager,
    table,
    workspaceId,
    workspaceMemberId,
    threadIds,
    isArchived = false,
    isSubscribed = true,
  }: AgentHistoryStorageContext & {
    workspaceId: string;
    workspaceMemberId: string;
    threadIds: string[];
    isArchived?: boolean;
    isSubscribed?: boolean;
  }): Promise<AgentChatThreadWorkspaceEntity[]> {
    return manager.query<AgentChatThreadWorkspaceEntity[]>(
      `WITH thread AS (
         UPDATE ${table('agentChatThread')}
         SET "lastActivityAt" = clock_timestamp()
         WHERE id = ANY($1::uuid[]) AND "lastActivityAt" IS NULL
         RETURNING *
       ), participant AS (
         INSERT INTO ${getAgentChatThreadParticipantTable(workspaceId)} ("threadId", "workspaceMemberId", "lastReadAt", "archivedAt", "isSubscribed")
         SELECT thread.id, $2, thread."lastActivityAt", CASE WHEN $3::boolean THEN clock_timestamp() END, $4::boolean
         FROM thread
         ON CONFLICT ("threadId", "workspaceMemberId") DO NOTHING
       )
       SELECT * FROM thread`,
      [threadIds, workspaceMemberId, isArchived, isSubscribed],
    );
  }

  async restoreThreadWithAccess(
    args: AgentChatThreadAccessArgs,
  ): Promise<AgentChatThreadWorkspaceEntity> {
    const authContext = await this.getAuthContext(args);

    return this.workspaceOrmManager.executeInWorkspaceContext(
      () =>
        this.threadRepository.query(
          args.workspaceId,
          async ({ manager, table }) => {
            const [thread] = await manager.query<
              AgentChatThreadWorkspaceEntity[]
            >(
              `SELECT * FROM ${table('agentChatThread')} WHERE id = $1 FOR UPDATE`,
              [args.threadId],
            );
            if (!isDefined(thread)) {
              return throwAgentChatThreadNotFound();
            }
            await this.assertOperationAllowed(args.threadId, 'restore');
            if (!isDefined(thread.deletedAt)) {
              return thread;
            }
            const [restoredThread] = await manager.query<
              AgentChatThreadWorkspaceEntity[]
            >(
              `WITH restored_thread AS (UPDATE ${table('agentChatThread')} SET "deletedAt" = NULL, "updatedAt" = NOW() WHERE id = $1 RETURNING *) SELECT * FROM restored_thread`,
              [args.threadId],
            );
            return restoredThread;
          },
        ),
      authContext,
    );
  }

  async getAuthContext(args: Omit<AgentChatThreadAccessArgs, 'threadId'>) {
    const authContext = await this.userAuthContextService
      .resolveWorkspaceMember(args)
      .catch((error: unknown) => {
        if (error instanceof AuthException) {
          return throwAgentChatThreadNotFound();
        }
        throw error;
      });
    if (
      !(await this.permissionsService.userHasWorkspaceSettingPermission({
        workspaceId: args.workspaceId,
        userWorkspaceId: authContext.userWorkspaceId,
        setting: PermissionFlagType.AI,
        applicationId: authContext.application?.id,
        agentId: authContext.agentId,
      }))
    ) {
      return throwAgentChatThreadNotFound();
    }
    return authContext;
  }

  // must run inside the caller's workspace context
  private async assertOperationAllowed(
    threadId: string,
    operationType: OperationType,
  ): Promise<void> {
    const allowedIds = await this.workspaceOrmManager
      .getRepositoryWithContextPermissions('agentChatThread')
      .findRecordIdsAllowedForOperation({
        recordIds: [threadId],
        operationType,
        withDeleted: true,
      });
    if (allowedIds.length !== 1) {
      throwAgentChatThreadNotFound();
    }
  }

  private async filterMemberIds(
    memberIds: string[],
    isKept: (memberId: string) => Promise<boolean>,
  ): Promise<string[]> {
    const keptMemberIds = await Promise.all(
      memberIds.map(async (memberId) => {
        try {
          return (await isKept(memberId)) ? memberId : null;
        } catch (error) {
          if (
            error instanceof AiException &&
            error.code === AiExceptionCode.THREAD_NOT_FOUND
          ) {
            return null;
          }
          throw error;
        }
      }),
    );

    return keptMemberIds.filter(isDefined);
  }

  private async getThreadObjectMetadata(workspaceId: string) {
    const { flatObjectMetadataMaps } =
      await this.workspaceCacheService.getOrRecompute(workspaceId, [
        'flatObjectMetadataMaps',
      ]);

    return (
      findAgentChatFlatObjectMetadata(
        flatObjectMetadataMaps,
        'agentChatThread',
      ) ?? throwAgentChatThreadNotFound()
    );
  }
}
