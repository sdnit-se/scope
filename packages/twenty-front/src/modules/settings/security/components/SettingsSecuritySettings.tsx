import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { isMultiWorkspaceEnabledState } from '@/client-config/states/isMultiWorkspaceEnabledState';
import { SettingsOptionCardContentCounter } from '@/settings/components/SettingsOptions/SettingsOptionCardContentCounter';
import { SettingsRoleDefaultRole } from '@/settings/roles/components/SettingsRolesDefaultRole';
import { SettingsRolesQueryEffect } from '@/settings/roles/components/SettingsRolesQueryEffect';
import { useSettingsAllRoles } from '@/settings/roles/hooks/useSettingsAllRoles';
import { SettingsSecurityAuthProvidersOptionsList } from '@/settings/security/components/SettingsSecurityAuthProvidersOptionsList';
import { SettingsSecurityEditableProfileFields } from '@/settings/security/components/SettingsSecurityEditableProfileFields';
import { SettingsSecurityIframeOrigins } from '@/settings/security/components/SettingsSecurityIframeOrigins';
import { ImpersonationSwitch } from '@/settings/workspace/components/ImpersonationSwitch';
import { useAtomState } from '@/ui/utilities/state/jotai/hooks/useAtomState';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useMutation } from '@apollo/client/react';
import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { useToast } from 'twenty-ui/components/feedback';
import { Section } from 'twenty-ui/components/layout';
import { IconTrash } from 'twenty-ui/icon';
import { Card } from 'twenty-ui/primitives/surfaces';
import { themeCssVariables } from 'twenty-ui/theme';
import { useDebouncedCallback } from 'use-debounce';
import { UpdateWorkspaceDocument } from '~/generated-metadata/graphql';

import { getToastOptionsFromError } from '@/error-handler/utils/getToastOptionsFromError';

const StyledContainer = styled.div`
  width: 100%;
`;

const StyledMainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[10]};
  min-height: 200px;
`;

export const SettingsSecuritySettings = () => {
  const { t } = useLingui();
  const { enqueueToast } = useToast();

  const isMultiWorkspaceEnabled = useAtomStateValue(
    isMultiWorkspaceEnabledState,
  );
  const [currentWorkspace, setCurrentWorkspace] = useAtomState(
    currentWorkspaceState,
  );
  const [updateWorkspace] = useMutation(UpdateWorkspaceDocument);

  const saveTrashRetention = useDebouncedCallback(async (value: number) => {
    try {
      await updateWorkspace({
        variables: {
          input: {
            trashRetentionDays: value,
          },
        },
      });
    } catch (err) {
      enqueueToast(getToastOptionsFromError({ error: err }));
    }
  }, 500);

  const handleTrashRetentionDaysChange = (value: number) => {
    if (!currentWorkspace) {
      return;
    }

    if (value === currentWorkspace.trashRetentionDays) {
      return;
    }

    setCurrentWorkspace({
      ...currentWorkspace,
      trashRetentionDays: value,
    });

    saveTrashRetention(value);
  };

  const roles = useSettingsAllRoles();

  return (
    <>
      <SettingsRolesQueryEffect />
      <StyledMainContent>
        <Section.Root>
          <StyledContainer>
            <Section.Header
              title={t`Authentication`}
              description={t`Customize your workspace security`}
            />
            <SettingsSecurityAuthProvidersOptionsList />
          </StyledContainer>
        </Section.Root>
        <Section.Root>
          <StyledContainer>
            <Section.Header
              title={t`Editable Profile Fields`}
              description={t`Choose which profile fields users with the Edit Profile permission can modify`}
            />
            <SettingsSecurityEditableProfileFields />
          </StyledContainer>
        </Section.Root>
        <SettingsRoleDefaultRole roles={roles} />
        <SettingsSecurityIframeOrigins />
        {isMultiWorkspaceEnabled && (
          <Section.Root>
            <Section.Header
              title={t`Support`}
              description={t`Manage support access settings`}
            />
            <ImpersonationSwitch />
          </Section.Root>
        )}
        <Section.Root>
          <Section.Header
            title={t`Other`}
            description={t`Other security settings`}
          />
          <Card.Root>
            <SettingsOptionCardContentCounter
              Icon={IconTrash}
              title={t`Erasure of soft-deleted records`}
              description={t`Permanent deletion. Enter the number of days.`}
              value={currentWorkspace?.trashRetentionDays ?? 14}
              onChange={handleTrashRetentionDaysChange}
              minValue={0}
              showButtons={false}
            />
          </Card.Root>
        </Section.Root>
      </StyledMainContent>
    </>
  );
};
