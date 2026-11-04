import { renderHook } from '@testing-library/react';
import { act } from 'react';

import { useAnyFieldFilterRelatedRecordFilters } from '@/object-record/record-filter/hooks/useAnyFieldFilterRelatedRecordFilters';
import { anyFieldFilterRelatedRecordFiltersComponentState } from '@/object-record/record-filter/states/anyFieldFilterRelatedRecordFiltersComponentState';
import { anyFieldFilterValueComponentState } from '@/object-record/record-filter/states/anyFieldFilterValueComponentState';
import { RecordFiltersComponentInstanceContext } from '@/object-record/record-filter/states/context/RecordFiltersComponentInstanceContext';
import { useSetAtomComponentState } from '@/ui/utilities/state/jotai/hooks/useSetAtomComponentState';
import { getJestMetadataAndApolloMocksWrapper } from '~/testing/jest/getJestMetadataAndApolloMocksWrapper';

const BaseWrapper = getJestMetadataAndApolloMocksWrapper({
  apolloMocks: [],
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <BaseWrapper>
    <RecordFiltersComponentInstanceContext.Provider
      value={{ instanceId: 'list' }}
    >
      {children}
    </RecordFiltersComponentInstanceContext.Provider>
  </BaseWrapper>
);

const SAAB_COMPANIES_FILTER = { companyId: { in: ['saab-id'] } };

describe('useAnyFieldFilterRelatedRecordFilters', () => {
  it('only returns matches found for the current search value', () => {
    const { result } = renderHook(
      () => ({
        relatedRecordFilters: useAnyFieldFilterRelatedRecordFilters(),
        setAnyFieldFilterValue: useSetAtomComponentState(
          anyFieldFilterValueComponentState,
        ),
        setRelatedRecordFilters: useSetAtomComponentState(
          anyFieldFilterRelatedRecordFiltersComponentState,
        ),
      }),
      { wrapper: Wrapper },
    );

    act(() => {
      result.current.setAnyFieldFilterValue('Saab');
      result.current.setRelatedRecordFilters({
        company: { filterValue: 'Saab', filter: SAAB_COMPANIES_FILTER },
      });
    });

    expect(result.current.relatedRecordFilters).toEqual([
      SAAB_COMPANIES_FILTER,
    ]);

    act(() => {
      result.current.setAnyFieldFilterValue('Gabriel');
    });

    expect(result.current.relatedRecordFilters).toEqual([]);
  });
});
