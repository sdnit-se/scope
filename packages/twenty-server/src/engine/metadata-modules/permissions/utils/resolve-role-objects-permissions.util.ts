import {
  type ObjectsPermissions,
  type ObjectsPermissionsByRoleId,
} from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';

import { type FlatEntityMaps } from 'src/engine/metadata-modules/flat-entity/types/flat-entity-maps.type';
import { type FlatFieldMetadata } from 'src/engine/metadata-modules/flat-field-metadata/types/flat-field-metadata.type';
import { type FlatObjectMetadata } from 'src/engine/metadata-modules/flat-object-metadata/types/flat-object-metadata.type';
import { restrictObjectsPermissionsToDisabledActions } from 'src/engine/twenty-orm/utils/restrict-objects-permissions-to-disabled-actions.util';

// What a role may do with each object, once the actions objects and fields
// switch off for everyone but their owning application are taken away
export const resolveRoleObjectsPermissions = ({
  roleId,
  owningApplicationId,
  rolesPermissions,
  flatFieldMetadataMaps,
  flatObjectMetadataMaps,
}: {
  roleId: string | null | undefined;
  owningApplicationId: string | undefined;
  rolesPermissions: ObjectsPermissionsByRoleId;
  flatFieldMetadataMaps: FlatEntityMaps<FlatFieldMetadata>;
  flatObjectMetadataMaps: FlatEntityMaps<FlatObjectMetadata>;
}): ObjectsPermissions | undefined => {
  const rolePermissions = isDefined(roleId)
    ? rolesPermissions[roleId]
    : undefined;

  return isDefined(rolePermissions)
    ? restrictObjectsPermissionsToDisabledActions({
        objectsPermissions: rolePermissions,
        flatObjectMetadataMaps,
        flatFieldMetadataMaps,
        actingApplicationId: owningApplicationId,
      })
    : undefined;
};
