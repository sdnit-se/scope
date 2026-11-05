import { useRecordIndexContextOrThrow } from '@/object-record/record-index/contexts/RecordIndexContext';
import { useResetRecordSelection } from '@/object-record/record-selection/hooks/useResetRecordSelection';
import { allRecordsSelectedStatusComponentSelector } from '@/object-record/record-selection/states/selectors/allRecordsSelectedStatusComponentSelector';
import { isRecordTableSelectModeComponentState } from '@/object-record/record-table/states/isRecordTableSelectModeComponentState';
import { useAtomComponentSelectorValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentSelectorValue';
import { useAtomComponentState } from '@/ui/utilities/state/jotai/hooks/useAtomComponentState';
import { Trans } from '@lingui/react/macro';
import { LightButton } from 'twenty-ui/components/input';
import { useIsMobile } from 'twenty-ui/utilities';

export const RecordIndexSelectButton = () => {
  const { recordIndexId } = useRecordIndexContextOrThrow();

  const isMobile = useIsMobile();

  const [isRecordTableSelectMode, setIsRecordTableSelectMode] =
    useAtomComponentState(isRecordTableSelectModeComponentState, recordIndexId);

  const allRecordsSelectedStatus = useAtomComponentSelectorValue(
    allRecordsSelectedStatusComponentSelector,
    recordIndexId,
  );

  const { resetRecordSelection } = useResetRecordSelection(recordIndexId);

  if (isMobile) {
    return null;
  }

  const isSelecting =
    isRecordTableSelectMode || allRecordsSelectedStatus !== 'none';

  const handleClick = () => {
    if (isSelecting) {
      resetRecordSelection();
      setIsRecordTableSelectMode(false);
    } else {
      setIsRecordTableSelectMode(true);
    }
  };

  return (
    <LightButton onClick={handleClick}>
      {isSelecting ? <Trans>Done</Trans> : <Trans>Select</Trans>}
    </LightButton>
  );
};
