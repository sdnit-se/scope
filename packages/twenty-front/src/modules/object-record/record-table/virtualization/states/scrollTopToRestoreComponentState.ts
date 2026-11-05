import { RecordTableComponentInstanceContext } from '@/object-record/record-table/states/context/RecordTableComponentInstanceContext';
import { createAtomComponentState } from '@/ui/utilities/state/jotai/utils/createAtomComponentState';

// Where the table was scrolled in each browser history entry, so back and forward return to that entry's place.
export const scrollTopToRestoreComponentState = createAtomComponentState<
  Record<string, number>
>({
  key: 'scrollTopToRestoreComponentState',
  componentInstanceContext: RecordTableComponentInstanceContext,
  defaultValue: {},
});
