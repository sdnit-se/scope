import { styled } from '@linaria/react';
import { type ReactNode } from 'react';
import { themeCssVariables } from 'twenty-ui/theme';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
`;

const StyledHeader = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[3]};
  justify-content: space-between;
`;

const StyledHeading = styled.h2`
  color: ${themeCssVariables.font.color.primary};
  font-size: ${themeCssVariables.font.size.xl};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  margin: 0;
`;

type SimpleModeSectionProps = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

export const SimpleModeSection = ({
  title,
  action,
  children,
}: SimpleModeSectionProps) => (
  <StyledSection aria-label={title}>
    <StyledHeader>
      <StyledHeading>{title}</StyledHeading>
      {action}
    </StyledHeader>
    {children}
  </StyledSection>
);
