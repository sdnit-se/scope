import { getAuthProvidersByWorkspace } from 'src/engine/core-modules/workspace/utils/get-auth-providers-by-workspace.util';
import { type WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';

describe('getAuthProvidersByWorkspace', () => {
  const mockWorkspace = {
    isGoogleAuthEnabled: true,
    isPasswordAuthEnabled: true,
    isMicrosoftAuthEnabled: false,
  } as unknown as WorkspaceEntity;

  it('should enable a provider only when both the workspace and the server enable it', () => {
    const result = getAuthProvidersByWorkspace({
      workspace: mockWorkspace,
      systemEnabledProviders: {
        google: true,
        magicLink: false,
        password: false,
        microsoft: true,
      },
    });

    expect(result).toEqual({
      google: true,
      magicLink: false,
      password: false,
      microsoft: false,
    });
  });

  it('should enable Microsoft auth when the workspace and the server enable it', () => {
    const result = getAuthProvidersByWorkspace({
      workspace: { ...mockWorkspace, isMicrosoftAuthEnabled: true },
      systemEnabledProviders: {
        google: true,
        magicLink: false,
        password: true,
        microsoft: true,
      },
    });

    expect(result).toEqual({
      google: true,
      magicLink: false,
      password: true,
      microsoft: true,
    });
  });
});
