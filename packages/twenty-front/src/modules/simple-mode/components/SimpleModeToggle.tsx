import { styled } from '@linaria/react';

import { SIMPLE_MODE_LABELS } from '@/simple-mode/constants/SimpleModeLabels';
import { useIsSimpleModeEnabled } from '@/simple-mode/hooks/useIsSimpleModeEnabled';
import { useSetSimpleMode } from '@/simple-mode/hooks/useSetSimpleMode';
import { Switch } from 'twenty-ui/primitives/input';
import { themeCssVariables } from 'twenty-ui/theme';

const StyledToggleRow = styled.label`
  align-items: center;
  color: ${themeCssVariables.font.color.primary};
  cursor: pointer;
  display: flex;
  font-weight: ${themeCssVariables.font.weight.medium};
  gap: ${themeCssVariables.spacing[2]};
  justify-content: space-between;
  padding: ${themeCssVariables.spacing[2]} ${themeCssVariables.spacing[1]};
`;

export const SimpleModeToggle = () => {
  const isSimpleModeEnabled = useIsSimpleModeEnabled();
  const { setSimpleMode } = useSetSimpleMode();

  return (
    <StyledToggleRow>
      {SIMPLE_MODE_LABELS.toggle}
      <Switch
        aria-label={SIMPLE_MODE_LABELS.toggle}
        size="sm"
        checked={isSimpleModeEnabled}
        onCheckedChange={setSimpleMode}
      />
    </StyledToggleRow>
  );
};
