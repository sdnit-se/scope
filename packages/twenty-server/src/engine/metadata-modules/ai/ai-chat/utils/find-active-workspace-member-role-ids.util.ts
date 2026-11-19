import { In, type Repository } from 'typeorm';
import { isDefined, isNonEmptyArray } from 'twenty-shared/utils';

import { type UserWorkspaceEntity } from 'src/engine/core-modules/user-workspace/user-workspace.entity';
import { type WorkspaceCacheService } from 'src/engine/workspace-cache/services/workspace-cache.service';

// The role of each member whose user is active in the workspace, by member id
export const findActiveWorkspaceMemberRoleIds = async ({
  workspaceId,
  memberIds,
  workspaceCacheService,
  userWorkspaceRepository,
}: {
  workspaceId: string;
  memberIds: string[];
  workspaceCacheService: WorkspaceCacheService;
  userWorkspaceRepository: Repository<UserWorkspaceEntity>;
}): Promise<Map<string, string>> => {
  const { flatWorkspaceMemberMaps, userWorkspaceRoleMap } =
    await workspaceCacheService.getOrRecompute(workspaceId, [
      'flatWorkspaceMemberMaps',
      'userWorkspaceRoleMap',
    ]);
  const userIdByMemberId = new Map(
    memberIds.flatMap((memberId) => {
      const userId = flatWorkspaceMemberMaps.byId[memberId]?.userId;

      return isDefined(userId) ? [[memberId, userId] as const] : [];
    }),
  );

  if (!isNonEmptyArray([...userIdByMemberId.values()])) {
    return new Map();
  }

  const userWorkspaces = await userWorkspaceRepository.find({
    where: { workspaceId, userId: In([...userIdByMemberId.values()]) },
    relations: { user: true },
  });
  const activeUserWorkspaceIdByUserId = new Map(
    userWorkspaces.flatMap(({ id, user, userId }) =>
      isDefined(user) && !user.disabled && !isDefined(user.deletedAt)
        ? [[userId, id] as const]
        : [],
    ),
  );

  return new Map(
    [...userIdByMemberId].flatMap(([memberId, userId]) => {
      const userWorkspaceId = activeUserWorkspaceIdByUserId.get(userId);
      const roleId = isDefined(userWorkspaceId)
        ? userWorkspaceRoleMap[userWorkspaceId]
        : undefined;

      return isDefined(roleId) ? [[memberId, roleId] as const] : [];
    }),
  );
};
