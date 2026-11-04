import { anyFieldFilterValueComponentState } from '@/object-record/record-filter/states/anyFieldFilterValueComponentState';
import { useAtomComponentState } from '@/ui/utilities/state/jotai/hooks/useAtomComponentState';
import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { SearchInput } from 'twenty-ui/components/input';

const StyledContainer = styled.div`
  width: 220px;
`;

export const ViewBarSearchInput = () => {
  const { t } = useLingui();

  const [anyFieldFilterValue, setAnyFieldFilterValue] = useAtomComponentState(
    anyFieldFilterValueComponentState,
  );

  return (
    <StyledContainer>
      <SearchInput
        size="sm"
        value={anyFieldFilterValue}
        placeholder={t`Search`}
        onChange={(event) => setAnyFieldFilterValue(event.target.value)}
      />
    </StyledContainer>
  );
};
