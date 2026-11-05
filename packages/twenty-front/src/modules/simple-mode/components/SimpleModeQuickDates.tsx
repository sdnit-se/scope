import { getSimpleModeQuickDates } from '@/simple-mode/utils/getSimpleModeQuickDates';
import { styled } from '@linaria/react';
import { Temporal } from 'temporal-polyfill';
import { Button } from 'twenty-ui/primitives/input';
import { themeCssVariables } from 'twenty-ui/theme';

const StyledQuickDates = styled.div`
  border-top: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  flex-wrap: wrap;
  gap: ${themeCssVariables.spacing[1]};
  padding: ${themeCssVariables.spacing[2]};
`;

type SimpleModeQuickDatesProps = {
  timeZone: string;
  onPick: (plainDate: string) => void;
};

export const SimpleModeQuickDates = ({
  timeZone,
  onPick,
}: SimpleModeQuickDatesProps) => (
  <StyledQuickDates>
    {getSimpleModeQuickDates(Temporal.Now.plainDateISO(timeZone)).map(
      ({ label, date }) => (
        <Button
          key={label}
          size="sm"
          variant="soft"
          color="neutral"
          onClick={() => onPick(date.toString())}
        >
          {label}
        </Button>
      ),
    )}
  </StyledQuickDates>
);
