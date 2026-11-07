import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { themeCssVariables } from 'twenty-ui/theme';

const StyledNoDataLine = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
`;

export const GraphWidgetNoDataLine = () => (
  <StyledNoDataLine>{t`No data`}</StyledNoDataLine>
);
