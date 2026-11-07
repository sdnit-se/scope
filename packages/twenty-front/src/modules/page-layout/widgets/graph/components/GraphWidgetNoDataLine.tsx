import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { themeCssVariables } from 'twenty-ui/theme';

const StyledNoDataLine = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
`;

// An empty chart says so in one line instead of drawing empty axes across its card.
export const GraphWidgetNoDataLine = () => (
  <StyledNoDataLine>{t`No data`}</StyledNoDataLine>
);
