import { MultiItemFieldSaveButton } from '@/object-record/record-field/ui/meta-types/input/components/MultiItemFieldSaveButton';
import { type MultiItemFieldInputSpacing } from '@/object-record/record-field/ui/meta-types/input/types/MultiItemFieldInputSpacing';
import { styled } from '@linaria/react';
import { isNonEmptyString } from '@sniptt/guards';
import { type ReactNode } from 'react';
import { isDefined } from 'twenty-shared/utils';
import { themeCssVariables } from 'twenty-ui/theme';

const COMPACT_ROW_HEIGHT = themeCssVariables.spacing[8];
const COMPACT_ROW_WITH_PADDING_HEIGHT = `calc(${themeCssVariables.spacing[8]} + 2 * ${themeCssVariables.spacing[1]})`;

const getInputRowHeight = ({
  spacing,
  hasPadding,
}: {
  spacing: MultiItemFieldInputSpacing;
  hasPadding: boolean;
}) => {
  if (spacing === 'default') {
    return 'auto';
  }

  return hasPadding ? COMPACT_ROW_WITH_PADDING_HEIGHT : COMPACT_ROW_HEIGHT;
};

const StyledInputRow = styled.div<{
  spacing: MultiItemFieldInputSpacing;
  hasPadding: boolean;
}>`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  gap: ${({ spacing }) =>
    spacing === 'compact' ? themeCssVariables.spacing[1] : '0'};
  height: ${getInputRowHeight};
  min-height: ${themeCssVariables.spacing[8]};
  padding: ${({ hasPadding }) =>
    hasPadding ? themeCssVariables.spacing[1] : '0'};
  width: 100%;
`;

const StyledRightContainer = styled.div<{
  spacing: MultiItemFieldInputSpacing;
}>`
  display: flex;
  flex-shrink: 0;
  padding-inline-end: ${({ spacing }) =>
    spacing === 'compact'
      ? themeCssVariables.spacing[1]
      : themeCssVariables.spacing[2]};
`;

const StyledErrorMessage = styled.div`
  color: ${themeCssVariables.font.color.danger};
  font-size: ${themeCssVariables.font.size.sm};
  padding: 0 ${themeCssVariables.spacing[2]} ${themeCssVariables.spacing[1]};
`;

type MultiItemFieldInputRowProps = {
  children: ReactNode;
  onSave?: () => void;
  errorMessage?: string;
  spacing?: MultiItemFieldInputSpacing;
  hasPadding?: boolean;
};

export const MultiItemFieldInputRow = ({
  children,
  onSave,
  errorMessage,
  spacing = 'default',
  hasPadding = false,
}: MultiItemFieldInputRowProps) => (
  <>
    <StyledInputRow spacing={spacing} hasPadding={hasPadding}>
      {children}
      {isDefined(onSave) && (
        <StyledRightContainer spacing={spacing}>
          <MultiItemFieldSaveButton onClick={onSave} />
        </StyledRightContainer>
      )}
    </StyledInputRow>
    {isNonEmptyString(errorMessage) && (
      <StyledErrorMessage role="alert">{errorMessage}</StyledErrorMessage>
    )}
  </>
);
