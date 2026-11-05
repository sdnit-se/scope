import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { computeRecordCreationDefaults } from '@/object-record/record-form/utils/computeRecordCreationDefaults';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useStore } from 'jotai';

export const useSimpleModeCreationDefaults = (objectNameSingular: string) => {
  const { objectMetadataItem } = useObjectMetadataItem({ objectNameSingular });
  const currentWorkspaceMember = useAtomStateValue(currentWorkspaceMemberState);
  const store = useStore();

  return (draftRecord: Partial<ObjectRecord>): Partial<ObjectRecord> => ({
    ...draftRecord,
    ...computeRecordCreationDefaults({
      objectNameSingular,
      fields: objectMetadataItem.fields,
      draftRecord,
      currentWorkspaceMemberId: currentWorkspaceMember?.id,
      getRecord: (recordId) =>
        store.get(recordStoreFamilyState.atomFamily(recordId)),
    }),
  });
};
