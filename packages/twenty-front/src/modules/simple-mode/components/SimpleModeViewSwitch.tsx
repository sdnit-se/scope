import { SIMPLE_MODE_LABELS } from '@/simple-mode/constants/SimpleModeLabels';
import { styled } from '@linaria/react';
import { Button } from 'twenty-ui/primitives/input';
import { themeCssVariables } from 'twenty-ui/theme';

import { type SimpleModeViewChoices } from '@/simple-mode/utils/getSimpleModeViewChoices';
import { useChangeView } from '@/views/hooks/useChangeView';
import { useGetCurrentViewOnly } from '@/views/hooks/useGetCurrentViewOnly';
import { isDefined } from 'twenty-shared/utils';

const StyledSwitch = styled.div`
  display: flex;
  gap: ${themeCssVariables.spacing[1]};
`;

type SimpleModeViewSwitchProps = {
  choices: SimpleModeViewChoices;
};

export const SimpleModeViewSwitch = ({
  choices,
}: SimpleModeViewSwitchProps) => {
  const { changeView } = useChangeView();
  const { currentView } = useGetCurrentViewOnly();

  const buttons = [
    {
      viewId: choices.allViewId,
      label: [SIMPLE_MODE_LABELS.all, choices.label].join(' '),
    },
    ...(isDefined(choices.mineViewId)
      ? [
          {
            viewId: choices.mineViewId,
            label: [SIMPLE_MODE_LABELS.mine, choices.label].join(' '),
          },
        ]
      : []),
  ];

  return (
    <StyledSwitch role="group" aria-label={choices.label}>
      {buttons.map(({ viewId, label }) => {
        const isActive = currentView?.id === viewId;

        return (
          <Button
            key={viewId}
            size="md"
            variant={isActive ? 'soft' : 'ghost'}
            color={isActive ? 'accent' : 'neutral'}
            aria-pressed={isActive}
            onClick={() => changeView(viewId)}
          >
            {label}
          </Button>
        );
      })}
    </StyledSwitch>
  );
};
