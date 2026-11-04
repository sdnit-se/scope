import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RecordFiltersComponentInstanceContext } from '@/object-record/record-filter/states/context/RecordFiltersComponentInstanceContext';
import { anyFieldFilterValueComponentState } from '@/object-record/record-filter/states/anyFieldFilterValueComponentState';
import { useAtomComponentStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateValue';
import { ViewBarSearchInput } from '@/views/components/ViewBarSearchInput';
import { getJestMetadataAndApolloMocksWrapper } from '~/testing/jest/getJestMetadataAndApolloMocksWrapper';

const BaseWrapper = getJestMetadataAndApolloMocksWrapper({
  apolloMocks: [],
});

const SearchedValue = () => (
  <output>
    {useAtomComponentStateValue(anyFieldFilterValueComponentState, 'list')}
  </output>
);

describe('ViewBarSearchInput', () => {
  it('is always visible and searches the list as you type', async () => {
    render(
      <BaseWrapper>
        <I18nProvider i18n={i18n}>
          <RecordFiltersComponentInstanceContext.Provider
            value={{ instanceId: 'list' }}
          >
            <ViewBarSearchInput />
            <SearchedValue />
          </RecordFiltersComponentInstanceContext.Provider>
        </I18nProvider>
      </BaseWrapper>,
    );

    const searchBox = screen.getByRole('textbox', { name: 'Search' });

    await userEvent.type(searchBox, 'Saab');

    expect(screen.getByRole('status')).toHaveTextContent('Saab');
  });
});
