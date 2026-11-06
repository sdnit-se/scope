import { SidePanelPageComponentInstanceContext } from '@/side-panel/states/contexts/SidePanelPageComponentInstanceContext';
import { createAtomComponentState } from '@/ui/utilities/state/jotai/utils/createAtomComponentState';

export const recordCreationFormIsSubmittingComponentState =
  createAtomComponentState<boolean>({
    key: 'side-panel/record-creation-form-is-submitting',
    defaultValue: false,
    componentInstanceContext: SidePanelPageComponentInstanceContext,
  });
