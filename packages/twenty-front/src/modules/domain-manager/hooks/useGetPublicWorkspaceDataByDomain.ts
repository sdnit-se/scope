import { workspacePublicDataState } from '@/auth/states/workspacePublicDataState';
import { clientConfigApiStatusState } from '@/client-config/states/clientConfigApiStatusState';
import { isMultiWorkspaceEnabledState } from '@/client-config/states/isMultiWorkspaceEnabledState';
import { useIsCurrentLocationOnDefaultDomain } from '@/domain-manager/hooks/useIsCurrentLocationOnDefaultDomain';
import { useOrigin } from '@/domain-manager/hooks/useOrigin';
import { useRedirectToDefaultDomain } from '@/domain-manager/hooks/useRedirectToDefaultDomain';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useSetAtomState } from '@/ui/utilities/state/jotai/hooks/useSetAtomState';
import { workspaceAuthProvidersState } from '@/workspace/states/workspaceAuthProvidersState';
import { useEffect } from 'react';
import { isDefined } from 'twenty-shared/utils';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { useQuery } from '@apollo/client/react';
import { GetPublicWorkspaceDataByDomainDocument } from '~/generated-metadata/graphql';

export const useGetPublicWorkspaceDataByDomain = () => {
  const { isDefaultDomain } = useIsCurrentLocationOnDefaultDomain();
  const isMultiWorkspaceEnabled = useAtomStateValue(
    isMultiWorkspaceEnabledState,
  );
  const { origin } = useOrigin();
  const setWorkspaceAuthProviders = useSetAtomState(
    workspaceAuthProvidersState,
  );
  const workspacePublicData = useAtomStateValue(workspacePublicDataState);
  const { redirectToDefaultDomain } = useRedirectToDefaultDomain();
  const setWorkspacePublicData = useSetAtomState(workspacePublicDataState);
  const clientConfigApiStatus = useAtomStateValue(clientConfigApiStatusState);

  const { loading, data, error } = useQuery(
    GetPublicWorkspaceDataByDomainDocument,
    {
      variables: {
        origin,
      },
      skip:
        !clientConfigApiStatus.isSaved ||
        (isMultiWorkspaceEnabled && isDefaultDomain) ||
        isDefined(workspacePublicData),
    },
  );

  // TODO: Refactor these useEffects to avoid unnecessary re-renders (see PR #18584 review)
  useEffect(() => {
    if (data) {
      setWorkspaceAuthProviders(
        data.getPublicWorkspaceDataByDomain.authProviders,
      );
      setWorkspacePublicData(data.getPublicWorkspaceDataByDomain);
    }
  }, [data, setWorkspaceAuthProviders, setWorkspacePublicData]);

  useEffect(() => {
    if (error) {
      if (CombinedGraphQLErrors.is(error)) {
        const isWorkspaceNotFoundError = error.errors?.some(
          (graphQLError) => graphQLError.extensions?.code === 'NOT_FOUND',
        );

        if (isWorkspaceNotFoundError) {
          redirectToDefaultDomain();
          return;
        }
      }
      // oxlint-disable-next-line no-console
      console.error(error);
    }
  }, [error, redirectToDefaultDomain]);

  return {
    loading,
    data: data?.getPublicWorkspaceDataByDomain,
    error,
  };
};
