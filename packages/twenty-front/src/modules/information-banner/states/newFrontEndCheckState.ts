import { createAtomState } from '@/ui/utilities/state/jotai/utils/createAtomState';

// Kept for the whole tab, so moving between pages neither hides the banner nor restarts the wait for a check.
export const newFrontEndCheckState = createAtomState<{
  lastCheckedAt: number;
  isNewFrontEndAvailable: boolean;
}>({
  key: 'newFrontEndCheckState',
  defaultValue: { lastCheckedAt: 0, isNewFrontEndAvailable: false },
});
