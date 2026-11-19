import { TWENTY_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER } from 'twenty-shared/application';

import { findActiveFlatApplicationByUniversalIdentifier } from 'src/engine/core-modules/application/utils/find-active-flat-application-by-universal-identifier.util';
import { findFlatEntityByUniversalIdentifier } from 'src/engine/metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util';
import { resolveRoleObjectsPermissions } from 'src/engine/metadata-modules/permissions/utils/resolve-role-objects-permissions.util';
import { type WorkspaceCacheService } from 'src/engine/workspace-cache/services/workspace-cache.service';
import { STANDARD_ROLE } from 'src/engine/workspace-manager/twenty-standard-application/constants/standard-role.constant';

// The workspace's own workflows and wake-ups run as the standard application,
// or as Admin before it exists
export const isObjectReadableByWorkspaceAutomation = async ({
  workspaceId,
  objectMetadataId,
  workspaceCacheService,
}: {
  workspaceId: string;
  objectMetadataId: string;
  workspaceCacheService: WorkspaceCacheService;
}): Promise<boolean> => {
  const {
    flatApplicationMaps,
    flatRoleMaps,
    rolesPermissions,
    flatFieldMetadataMaps,
    flatObjectMetadataMaps,
  } = await workspaceCacheService.getOrRecompute(workspaceId, [
    'flatApplicationMaps',
    'flatRoleMaps',
    'rolesPermissions',
    'flatFieldMetadataMaps',
    'flatObjectMetadataMaps',
  ]);
  const standardApplication = findActiveFlatApplicationByUniversalIdentifier(
    flatApplicationMaps,
    TWENTY_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER,
  );

  return (
    resolveRoleObjectsPermissions({
      roleId:
        standardApplication?.defaultRoleId ??
        findFlatEntityByUniversalIdentifier({
          flatEntityMaps: flatRoleMaps,
          universalIdentifier: STANDARD_ROLE.admin.universalIdentifier,
        })?.id,
      owningApplicationId: standardApplication?.id,
      rolesPermissions,
      flatFieldMetadataMaps,
      flatObjectMetadataMaps,
    })?.[objectMetadataId]?.canReadObjectRecords === true
  );
};
