import { ApolloAdminClientContext } from '@/settings/admin-panel/apollo/contexts/ApolloAdminClientContext';
import { SettingsAdminServerAdminAccess } from '@/settings/admin-panel/components/SettingsAdminServerAdminAccess';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { graphql, HttpResponse } from 'msw';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { ComponentDecorator } from 'twenty-ui/testing';
import { ToastDecorator } from '~/testing/decorators/ToastDecorator';
import { mockedApolloClient } from '~/testing/mockedApolloClient';

const meta: Meta<typeof SettingsAdminServerAdminAccess> = {
  title: 'Modules/Settings/AdminPanel/SettingsAdminServerAdminAccess',
  component: SettingsAdminServerAdminAccess,
  args: { userId: 'last-admin', userLabel: 'Last admin' },
  decorators: [
    ComponentDecorator,
    ToastDecorator,
    (Story) => (
      <ApolloAdminClientContext.Provider value={mockedApolloClient}>
        <Story />
      </ApolloAdminClientContext.Provider>
    ),
  ],
  parameters: {
    msw: {
      handlers: [
        graphql.query('GetServerAdmins', () =>
          HttpResponse.json({
            data: {
              getServerAdmins: [
                {
                  id: 'last-admin',
                  email: 'admin@example.com',
                  firstName: 'Last',
                  lastName: 'admin',
                  canAccessFullAdminPanel: true,
                  canImpersonate: true,
                },
              ],
            },
          }),
        ),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SettingsAdminServerAdminAccess>;

export const LastAdministratorProtection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    await canvas.findByText('Admin panel');
    await userEvent.click(canvas.getByRole('button', { name: 'More options' }));
    const revokeAdminAccess = await canvas.findByRole('menuitem', {
      name: 'Revoke admin panel access',
    });

    await expect(revokeAdminAccess).toBeDisabled();
    await userEvent.click(revokeAdminAccess);
    await expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
    await expect(canvas.getByRole('menu')).toBeVisible();

    await userEvent.click(
      canvas.getByRole('menuitem', { name: 'Disable impersonation' }),
    );

    const confirmation = await canvas.findByRole('dialog', {
      name: 'Revoke access',
    });
    await expect(confirmation).toHaveTextContent(
      'This will revoke impersonation for Last admin.',
    );
    await waitFor(() =>
      expect(canvas.queryByRole('menu')).not.toBeInTheDocument(),
    );
    await userEvent.click(
      within(confirmation).getByRole('button', { name: 'Cancel' }),
    );
    await waitFor(() =>
      expect(canvas.queryByRole('dialog')).not.toBeInTheDocument(),
    );
  },
};

export const GrantingServerToolsIsNotCrmAccess: Story = {
  args: { userId: 'new-colleague', userLabel: 'New colleague' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    await canvas.findByText('No access');
    await userEvent.click(canvas.getByRole('button', { name: 'More options' }));
    await userEvent.click(
      await canvas.findByRole('menuitem', { name: 'Grant all server tools' }),
    );

    const confirmation = await canvas.findByRole('dialog', {
      name: 'Grant access',
    });
    await expect(confirmation).toHaveTextContent(
      'This will grant all server tools to New colleague.',
    );
    await expect(confirmation).toHaveTextContent(
      'This does not give access to CRM records.',
    );
  },
};
