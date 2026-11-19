import { CoreObjectNameSingular } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';

import { type AgentChatThreadPermissions } from '@/ai/types/AgentChatThreadPermissions';
import { objectMetadataItemFamilySelector } from '@/object-metadata/states/objectMetadataItemFamilySelector';
import { objectPermissionsByObjectMetadataIdSelector } from '@/object-metadata/states/objectPermissionsByObjectMetadataIdSelector';
import { getObjectPermissionsForObject } from '@/object-metadata/utils/getObjectPermissionsForObject';
import { createAtomSelector } from '@/ui/utilities/state/jotai/utils/createAtomSelector';
import { isDeeplyEqual } from '~/utils/isDeeplyEqual';

// The role decides for every chat alike: chats are not shared one by one
export const agentChatThreadPermissionsSelector = createAtomSelector<
  AgentChatThreadPermissions | undefined
>({
  key: 'agentChatThreadPermissionsSelector',
  areEqual: isDeeplyEqual,
  get: ({ get }) => {
    const objectMetadata = get(objectMetadataItemFamilySelector, {
      objectName: CoreObjectNameSingular.AgentChatThread,
      objectNameType: 'singular',
    });

    if (!isDefined(objectMetadata)) {
      return undefined;
    }

    const objectPermissions = getObjectPermissionsForObject(
      get(objectPermissionsByObjectMetadataIdSelector),
      objectMetadata.id,
    );

    return {
      canRead: objectPermissions.canReadObjectRecords,
      canUpdate: objectPermissions.canUpdateObjectRecords,
      canSoftDelete: objectPermissions.canSoftDeleteObjectRecords,
      canDelete: objectPermissions.canDestroyObjectRecords,
    };
  },
});
