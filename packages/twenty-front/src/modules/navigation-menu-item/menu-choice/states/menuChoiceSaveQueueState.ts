import { createAtomState } from '@/ui/utilities/state/jotai/utils/createAtomState';

// Saves run one after another so a later choice never races an earlier one or a record still being created.
export const menuChoiceSaveQueueState = createAtomState<Promise<void>>({
  key: 'menuChoiceSaveQueueState',
  defaultValue: Promise.resolve(),
});
