import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { MockLink } from '@apollo/client/testing';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { render, screen } from '@testing-library/react';
import { createStore, Provider as JotaiProvider } from 'jotai';

import { ApolloAdminClientContext } from '@/settings/admin-panel/apollo/contexts/ApolloAdminClientContext';
import { FindAdminApplicationRegistrationStatsDocument } from '~/generated-admin/graphql';
import {
  type ApplicationRegistrationStats,
  FindApplicationRegistrationStatsDocument,
} from '~/generated-metadata/graphql';
import { SettingsApplicationRegistrationInstallStats } from '~/pages/settings/applications/components/SettingsApplicationRegistrationInstallStats';

const STATS: Pick<
  ApplicationRegistrationStats,
  | 'activeInstalls'
  | 'suspendedInstalls'
  | 'autoUpdateEnabled'
  | 'mostInstalledVersion'
  | 'versionDistribution'
> = {
  activeInstalls: 4,
  suspendedInstalls: 0,
  autoUpdateEnabled: 2,
  mostInstalledVersion: '1.2.3',
  versionDistribution: [{ version: '1.2.3', count: 4 }],
};

const renderStats = ({
  isAdminView = false,
}: {
  isAdminView?: boolean;
} = {}) => {
  const store = createStore();

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new MockLink([
      {
        request: {
          query: isAdminView
            ? FindAdminApplicationRegistrationStatsDocument
            : FindApplicationRegistrationStatsDocument,
          variables: { id: 'registration-id' },
        },
        result: {
          data: {
            [isAdminView
              ? 'findAdminApplicationRegistrationStats'
              : 'findApplicationRegistrationStats']: STATS,
          },
        },
        delay: 0,
      },
    ]),
  });

  return render(
    <JotaiProvider store={store}>
      <I18nProvider i18n={i18n}>
        <ApolloAdminClientContext.Provider value={client}>
          <ApolloProvider client={client}>
            <SettingsApplicationRegistrationInstallStats
              registration={{ id: 'registration-id' }}
              isAdminView={isAdminView}
            />
          </ApolloProvider>
        </ApolloAdminClientContext.Provider>
      </I18nProvider>
    </JotaiProvider>,
  );
};

describe('Application registration statistics', () => {
  it.each([false, true])(
    'shows install statistics without credit consumption for owner/admin view: %s',
    async (isAdminView) => {
      renderStats({ isAdminView });

      expect(await screen.findByText('1.2.3')).toBeVisible();
      expect(screen.getByText('Installs')).toBeVisible();
      expect(
        screen.queryByText('Credits used this month'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('On suspended workspaces'),
      ).not.toBeInTheDocument();
    },
  );
});
