import { styled } from '@linaria/react';
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AppPath } from 'twenty-shared/types';
import { getAppPath } from 'twenty-shared/utils';
import { themeCssVariables } from 'twenty-ui/theme';

export const StyledSimpleModeRowList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledRow = styled.li`
  align-items: center;
  border-bottom: 1px solid ${themeCssVariables.border.color.medium};
  display: flex;
  gap: ${themeCssVariables.spacing[3]};
  min-height: 44px;
  padding: ${themeCssVariables.spacing[1]} 0;
`;

const StyledLink = styled(Link)`
  color: ${themeCssVariables.font.color.primary};
  flex: 1;
  font-size: ${themeCssVariables.font.size.lg};
  font-weight: ${themeCssVariables.font.weight.medium};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledDetail = styled.span`
  color: ${themeCssVariables.font.color.secondary};
`;

export const StyledSimpleModeEmpty = styled.p`
  color: ${themeCssVariables.font.color.secondary};
  margin: 0;
`;

type SimpleModeRecordRowProps = {
  objectNameSingular: string;
  recordId: string;
  label: string;
  detail?: string;
  leading?: ReactNode;
};

// A whole row of words that opens the record's own page, instead of a chip that opens a panel.
export const SimpleModeRecordRow = ({
  objectNameSingular,
  recordId,
  label,
  detail,
  leading,
}: SimpleModeRecordRowProps) => (
  <StyledRow>
    {leading}
    <StyledLink
      to={getAppPath(AppPath.RecordShowPage, {
        objectNameSingular,
        objectRecordId: recordId,
      })}
    >
      {label}
    </StyledLink>
    {detail && <StyledDetail>{detail}</StyledDetail>}
  </StyledRow>
);
