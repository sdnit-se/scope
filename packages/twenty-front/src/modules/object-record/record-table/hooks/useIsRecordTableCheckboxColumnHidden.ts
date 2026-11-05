import { allRecordsSelectedStatusComponentSelector } from '@/object-record/record-selection/states/selectors/allRecordsSelectedStatusComponentSelector';
import { RecordTableComponentInstanceContext } from '@/object-record/record-table/states/context/RecordTableComponentInstanceContext';
import { isRecordTableCheckboxColumnHiddenComponentState } from '@/object-record/record-table/states/isRecordTableCheckboxColumnHiddenComponentState';
import { isRecordTableSelectModeComponentState } from '@/object-record/record-table/states/isRecordTableSelectModeComponentState';
import { useAvailableComponentInstanceIdOrThrow } from '@/ui/utilities/state/component-state/hooks/useAvailableComponentInstanceIdOrThrow';
import { useAtomComponentSelectorValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentSelectorValue';
import { useAtomComponentStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateValue';
import { useIsMobile } from 'twenty-ui/utilities';

// Row tick-boxes stay out of sight until someone asks for them with "Select" or already has rows selected.
export const useIsRecordTableCheckboxColumnHidden = (instanceId?: string) => {
  const recordTableId = useAvailableComponentInstanceIdOrThrow(
    RecordTableComponentInstanceContext,
    instanceId,
  );

  const isMobile = useIsMobile();

  const isRecordTableCheckboxColumnHidden = useAtomComponentStateValue(
    isRecordTableCheckboxColumnHiddenComponentState,
    recordTableId,
  );

  const isRecordTableSelectMode = useAtomComponentStateValue(
    isRecordTableSelectModeComponentState,
    recordTableId,
  );

  const allRecordsSelectedStatus = useAtomComponentSelectorValue(
    allRecordsSelectedStatusComponentSelector,
    recordTableId,
  );

  return (
    isRecordTableCheckboxColumnHidden ||
    isMobile ||
    (!isRecordTableSelectMode && allRecordsSelectedStatus === 'none')
  );
};
