import { SidePanelPageComponentInstanceContext } from '@/side-panel/states/contexts/SidePanelPageComponentInstanceContext';
import { createAtomComponentState } from '@/ui/utilities/state/jotai/utils/createAtomComponentState';

// The contact whose company is still being looked up; kept per creation request so leaving the form and coming
// back still holds Create until it arrives.
export const recordCreationFormPendingContactLookupComponentState =
  createAtomComponentState<string | null>({
    key: 'side-panel/record-creation-form-pending-contact-lookup',
    defaultValue: null,
    componentInstanceContext: SidePanelPageComponentInstanceContext,
  });
