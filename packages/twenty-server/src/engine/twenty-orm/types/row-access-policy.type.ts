import { type ObjectsPermissions } from 'twenty-shared/types';

import { type FlatObjectMetadata } from 'src/engine/metadata-modules/flat-object-metadata/types/flat-object-metadata.type';
import { type OperationType } from 'src/engine/twenty-orm/repository/permissions.utils';

export type RowAccessPolicy = { kind: 'open' } | { kind: 'denied' };

export type RowAccessSubject = {
  isSystemContext: boolean;
  objectsPermissions: ObjectsPermissions | undefined;
  isOwningApplication: (objectMetadata: FlatObjectMetadata) => boolean;
};

export type RowAccessPolicyTarget = {
  flatObjectMetadata: FlatObjectMetadata;
  operationType: OperationType;
};
