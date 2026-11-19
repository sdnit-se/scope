import { isDefined } from 'twenty-shared/utils';

import {
  type RowAccessPolicy,
  type RowAccessPolicySubject,
  type RowAccessPolicyTarget,
} from 'src/engine/twenty-orm/types/row-access-policy.type';
import { isObjectOperationDisabled } from 'src/engine/twenty-orm/utils/is-object-operation-disabled.util';
import { isObjectOperationPermitted } from 'src/engine/twenty-orm/utils/is-object-operation-permitted.util';

export type RowAccessSubject = Pick<
  RowAccessPolicySubject,
  'isSystemContext' | 'objectsPermissions' | 'isOwningApplication'
>;

// The role alone decides, for every record of an object alike; see
// docs/clean-room/record-visibility.md
export const buildRowAccessPolicy = ({
  subject,
  flatObjectMetadata,
  operationType,
}: { subject: RowAccessSubject } & Pick<
  RowAccessPolicyTarget,
  'flatObjectMetadata' | 'operationType'
>): Extract<RowAccessPolicy, { kind: 'open' | 'denied' }> => {
  if (subject.isSystemContext) {
    return { kind: 'open' };
  }

  if (
    isObjectOperationDisabled({
      objectMetadata: flatObjectMetadata,
      operationType,
    }) &&
    !subject.isOwningApplication(flatObjectMetadata)
  ) {
    return { kind: 'denied' };
  }

  if (
    isDefined(subject.objectsPermissions) &&
    !isObjectOperationPermitted({
      objectMetadata: flatObjectMetadata,
      operationType,
      objectsPermissions: subject.objectsPermissions,
    })
  ) {
    return { kind: 'denied' };
  }

  return { kind: 'open' };
};
