import { FieldActorSource } from 'twenty-shared/types';

import { type ApplicationService } from 'src/engine/core-modules/application/application.service';
import { type ToolProviderContext } from 'src/engine/core-modules/tool-provider/interfaces/tool-provider-context.type';
import { type ObjectPermissionService } from 'src/engine/metadata-modules/object-permission/object-permission.service';
import { type RoleService } from 'src/engine/metadata-modules/role/role.service';
import { AssignRoleToWorkspaceMemberTool } from 'src/engine/metadata-modules/role/tools/assign-role-to-workspace-member.tool';
import { CreateRoleTool } from 'src/engine/metadata-modules/role/tools/create-role.tool';
import { DeleteRoleTool } from 'src/engine/metadata-modules/role/tools/delete-role.tool';
import { ListRolesTool } from 'src/engine/metadata-modules/role/tools/list-roles.tool';
import { UpdateRoleTool } from 'src/engine/metadata-modules/role/tools/update-role.tool';
import { UpsertObjectPermissionsTool } from 'src/engine/metadata-modules/role/tools/upsert-object-permissions.tool';
import { type UserRoleService } from 'src/engine/metadata-modules/user-role/user-role.service';

const workspaceId = 'workspace-id';
const callerRoleId = 'caller-role-id';
const callerUserWorkspaceId = 'caller-user-workspace-id';
const otherRoleId = '0f1e2d3c-4b5a-4968-8776-655443322110';
const supportRoleId = '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d';
const targetMemberId = '2b3c4d5e-6f7a-4b8c-9d0e-1f2a3b4c5d6e';
const objectMetadataId = '3c4d5e6f-7a8b-4c9d-8e1f-2a3b4c5d6e7f';

const buildServices = () => ({
  roleService: {
    getWorkspaceRoles: jest.fn().mockResolvedValue([]),
    createRole: jest.fn(),
    updateRole: jest.fn(),
    deleteRole: jest.fn(),
  },
  userRoleService: {
    assignRoleToWorkspaceMember: jest.fn().mockResolvedValue({
      workspaceMember: {
        id: targetMemberId,
        userId: 'target-user-id',
        name: { firstName: 'Jane', lastName: 'Doe' },
      },
      userWorkspaceId: 'target-user-workspace-id',
    }),
  },
  objectPermissionService: {
    upsertObjectPermissions: jest.fn().mockResolvedValue([]),
  },
  applicationService: {
    findWorkspaceTwentyStandardAndCustomApplicationOrThrow: jest
      .fn()
      .mockResolvedValue({
        workspaceCustomFlatApplication: {
          id: 'application-id',
          universalIdentifier: 'application-universal-identifier',
        },
      }),
  },
});

const buildListRolesTool = (services: ReturnType<typeof buildServices>) =>
  new ListRolesTool(services.roleService as unknown as RoleService);

const context: ToolProviderContext = {
  workspaceId,
  rolePermissionConfig: {
    intersectionOf: { userWorkspaceRoleId: callerRoleId },
  },
  userWorkspaceId: callerUserWorkspaceId,
  actorContext: {
    source: FieldActorSource.MANUAL,
    workspaceMemberId: 'caller-workspace-member-id',
    name: 'Caller',
    context: {},
  },
};

describe('Role tools', () => {
  describe('list_roles', () => {
    it('returns the workspace roles', async () => {
      const services = buildServices();

      services.roleService.getWorkspaceRoles.mockResolvedValue([
        {
          id: 'role-1',
          label: 'Support',
          isEditable: true,
          objectPermissions: [],
          permissionFlags: [],
        },
      ]);

      const output = await buildListRolesTool(services).execute({
        input: {},
        context,
      });

      expect(output.success).toBe(true);
      expect(services.roleService.getWorkspaceRoles).toHaveBeenCalledWith(
        workspaceId,
      );
    });
  });

  describe('create_role', () => {
    it('creates a role through the role service', async () => {
      const services = buildServices();

      services.roleService.createRole.mockResolvedValue({
        id: 'new-role-id',
        label: 'Sales',
      });

      const output = await new CreateRoleTool(
        services.roleService as unknown as RoleService,
        services.applicationService as unknown as ApplicationService,
      ).execute({
        input: { label: 'Sales', canReadAllObjectRecords: true },
        context,
      });

      expect(output.success).toBe(true);
      expect(services.roleService.createRole).toHaveBeenCalledWith(
        expect.objectContaining({
          workspaceId,
          input: expect.objectContaining({
            label: 'Sales',
            canReadAllObjectRecords: true,
          }),
        }),
      );
    });
  });

  describe('update_role', () => {
    it('updates the role, forwarding the caller roles for lockout protection', async () => {
      const services = buildServices();

      services.roleService.updateRole.mockResolvedValue({
        id: otherRoleId,
        label: 'Support L1',
      });

      const output = await new UpdateRoleTool(
        services.roleService as unknown as RoleService,
      ).execute({
        input: {
          roleId: otherRoleId,
          update: { canUpdateAllSettings: false, label: 'Support L1' },
        },
        context,
      });

      expect(output.success).toBe(true);
      expect(services.roleService.updateRole).toHaveBeenCalledWith({
        workspaceId,
        input: {
          id: otherRoleId,
          update: { canUpdateAllSettings: false, label: 'Support L1' },
        },
        actingRoleIds: [callerRoleId],
      });
    });

    it('forwards every role of the caller config for lockout protection', async () => {
      const services = buildServices();

      services.roleService.updateRole.mockResolvedValue({ id: otherRoleId });

      await new UpdateRoleTool(
        services.roleService as unknown as RoleService,
      ).execute({
        input: { roleId: otherRoleId, update: { canUpdateAllSettings: false } },
        context: {
          ...context,
          rolePermissionConfig: {
            intersectionOf: {
              userWorkspaceRoleId: callerRoleId,
              applicationRoleId: 'application-role-id',
            },
          },
        },
      });

      expect(services.roleService.updateRole).toHaveBeenCalledTimes(1);
      expect(services.roleService.updateRole).toHaveBeenCalledWith(
        expect.objectContaining({
          actingRoleIds: [callerRoleId, 'application-role-id'],
        }),
      );
    });

    it('forwards no caller role when the config bypasses permission checks', async () => {
      const services = buildServices();

      services.roleService.updateRole.mockResolvedValue({ id: otherRoleId });

      await new UpdateRoleTool(
        services.roleService as unknown as RoleService,
      ).execute({
        input: { roleId: otherRoleId, update: { canUpdateAllSettings: false } },
        context: {
          ...context,
          rolePermissionConfig: { shouldBypassPermissionChecks: true },
        },
      });

      expect(services.roleService.updateRole).toHaveBeenCalledTimes(1);
      expect(services.roleService.updateRole).toHaveBeenCalledWith(
        expect.objectContaining({ actingRoleIds: [] }),
      );
    });
  });

  describe('delete_role', () => {
    it('deletes the role, forwarding the caller roles for lockout protection', async () => {
      const services = buildServices();

      services.roleService.deleteRole.mockResolvedValue({
        id: otherRoleId,
        label: 'Support',
      });

      const output = await new DeleteRoleTool(
        services.roleService as unknown as RoleService,
      ).execute({ input: { roleId: otherRoleId }, context });

      expect(output.success).toBe(true);
      expect(services.roleService.deleteRole).toHaveBeenCalledWith({
        roleId: otherRoleId,
        workspaceId,
        actingRoleIds: [callerRoleId],
      });
    });
  });

  describe('assign_role_to_workspace_member', () => {
    it('delegates to the user role service with the acting user workspace', async () => {
      const services = buildServices();

      const output = await new AssignRoleToWorkspaceMemberTool(
        services.userRoleService as unknown as UserRoleService,
      ).execute({
        input: { workspaceMemberId: targetMemberId, roleId: otherRoleId },
        context,
      });

      expect(output.success).toBe(true);
      expect(
        services.userRoleService.assignRoleToWorkspaceMember,
      ).toHaveBeenCalledWith({
        workspaceId,
        workspaceMemberId: targetMemberId,
        roleId: otherRoleId,
        actingUserWorkspaceId: callerUserWorkspaceId,
      });
    });
  });

  describe('upsert_object_permissions', () => {
    it('upserts object permission overrides through the service', async () => {
      const services = buildServices();
      const objectPermission = {
        objectMetadataId: objectMetadataId,
        canReadObjectRecords: true,
        canUpdateObjectRecords: false,
        canSoftDeleteObjectRecords: false,
        canDestroyObjectRecords: false,
      };

      services.objectPermissionService.upsertObjectPermissions.mockResolvedValue(
        [objectPermission],
      );

      const output = await new UpsertObjectPermissionsTool(
        services.objectPermissionService as unknown as ObjectPermissionService,
      ).execute({
        input: { roleId: supportRoleId, objectPermissions: [objectPermission] },
        context,
      });

      expect(output.success).toBe(true);
      expect(
        services.objectPermissionService.upsertObjectPermissions,
      ).toHaveBeenCalledWith({
        workspaceId,
        input: {
          roleId: supportRoleId,
          objectPermissions: [objectPermission],
        },
      });
    });
  });
});
