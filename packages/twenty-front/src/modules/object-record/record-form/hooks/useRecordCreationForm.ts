import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { useObjectMetadataItems } from '@/object-metadata/hooks/useObjectMetadataItems';
import { computeRecordCreationDefaults } from '@/object-record/record-form/utils/computeRecordCreationDefaults';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { useStore } from 'jotai';
import { useRecordCreationFormContextOrThrow } from '@/object-record/record-form/contexts/RecordCreationFormContext';
import { type RecordCreationRequest } from '@/object-record/record-form/types/RecordCreationRequest';
import { computeRecordFormCreateRecordInput } from '@/object-record/record-form/utils/computeRecordFormCreateRecordInput';
import { useIsFeatureEnabled } from '@/workspace/hooks/useIsFeatureEnabled';
import { useCallback } from 'react';
import { FeatureFlagKey } from '~/generated-metadata/graphql';

export const useRecordCreationForm = () => {
  const { requestRecordCreation } = useRecordCreationFormContextOrThrow();
  const { objectMetadataItems } = useObjectMetadataItems();
  const currentWorkspaceMember = useAtomStateValue(currentWorkspaceMemberState);
  const store = useStore();

  const isRecordCreationFormEnabled = useIsFeatureEnabled(
    FeatureFlagKey.IS_RECORD_CREATION_FORM_ENABLED,
  );

  const createRecordWithOptionalForm = useCallback(
    (originalRequest: RecordCreationRequest) => {
      const getDefaults = (draftRecord: Partial<ObjectRecord>) =>
        computeRecordCreationDefaults({
          objectNameSingular: originalRequest.objectMetadataItem.nameSingular,
          fields: originalRequest.objectMetadataItem.fields,
          draftRecord,
          currentWorkspaceMemberId: currentWorkspaceMember?.id,
          getRecord: (recordId) =>
            store.get(recordStoreFamilyState.atomFamily(recordId)),
        });

      const draftRecord = originalRequest.initialDraftRecord ?? {};
      const request = {
        ...originalRequest,
        // Defaults only cover fields the draft leaves empty, so they go last.
        initialDraftRecord: { ...draftRecord, ...getDefaults(draftRecord) },
      };

      if (isRecordCreationFormEnabled) {
        return requestRecordCreation(request);
      }

      return request.createRecord(
        computeRecordFormCreateRecordInput({
          draftRecord: request.initialDraftRecord ?? {},
          fieldMetadataItems: request.objectMetadataItem.fields,
          objectMetadataItems,
        }),
      );
    },
    [
      currentWorkspaceMember?.id,
      isRecordCreationFormEnabled,
      objectMetadataItems,
      requestRecordCreation,
      store,
    ],
  );

  return {
    createRecordWithOptionalForm,
  };
};
