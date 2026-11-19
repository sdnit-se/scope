import { type ObjectRecordEvent } from 'twenty-shared/database-events';

import { isUpdateOfHiddenFieldsOnly } from 'src/engine/metadata-modules/permissions/utils/is-update-of-hidden-fields-only.util';
import { omitRestrictedFieldsFromEvent } from 'src/engine/metadata-modules/permissions/utils/omit-restricted-fields-from-event.util';
import { resolveRoleObjectsPermissions } from 'src/engine/metadata-modules/permissions/utils/resolve-role-objects-permissions.util';
import { type WorkspaceEventBatch } from 'src/engine/workspace-event-emitter/types/workspace-event-batch.type';

// A recipient hears about a change when its role may read the object, without
// the fields the role may not read; see docs/clean-room/record-visibility.md
export const resolveEventsReadableByRole = <TEvent extends ObjectRecordEvent>({
  workspaceEventBatch,
  ...roleArgs
}: Parameters<typeof resolveRoleObjectsPermissions>[0] & {
  workspaceEventBatch: WorkspaceEventBatch<TEvent>;
}): TEvent[] => {
  const objectsPermissions = resolveRoleObjectsPermissions(roleArgs);

  if (
    objectsPermissions?.[workspaceEventBatch.objectMetadata.id]
      ?.canReadObjectRecords !== true
  ) {
    return [];
  }

  return workspaceEventBatch.events
    .map((event) =>
      omitRestrictedFieldsFromEvent({
        event,
        objectMetadata: workspaceEventBatch.objectMetadata,
        objectsPermissions,
        flatObjectMetadataMaps: roleArgs.flatObjectMetadataMaps,
        flatFieldMetadataMaps: roleArgs.flatFieldMetadataMaps,
      }),
    )
    .filter((event) => !isUpdateOfHiddenFieldsOnly(event));
};
