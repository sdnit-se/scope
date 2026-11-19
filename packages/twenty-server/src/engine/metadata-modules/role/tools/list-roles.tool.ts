import { ToolCategory } from 'twenty-shared/ai';
import { PermissionFlagType } from 'twenty-shared/constants';
import { z } from 'zod';

import { DefineTool } from 'src/engine/core-modules/tool-provider/decorators/define-tool.decorator';
import { BaseTool } from 'src/engine/core-modules/tool-provider/interfaces/base-tool.interface';
import { type ToolExecuteArgs } from 'src/engine/core-modules/tool-provider/types/tool-execute-args.type';
import { type ToolOutput } from 'src/engine/core-modules/tool/types/tool-output.type';
import { RoleService } from 'src/engine/metadata-modules/role/role.service';
import { toRoleSummary } from 'src/engine/metadata-modules/role/tools/utils/to-role-summary.util';

const listRolesInputSchema = z.object({});

@DefineTool({
  name: 'list_roles',
  category: ToolCategory.ROLE,
  requiredPermissionFlags: [PermissionFlagType.ROLES],
  description: `List all roles of this workspace with their permissions.

Returns for each role: global record permissions (canReadAllObjectRecords, ...), settings access (canUpdateAllSettings), per-object permission overrides, permission flags, and assignability (users, agents, API keys).
Roles with isEditable=false (like Admin) are system-managed and cannot be changed.`,
})
export class ListRolesTool extends BaseTool<typeof listRolesInputSchema> {
  readonly inputSchema = listRolesInputSchema;

  constructor(private readonly roleService: RoleService) {
    super();
  }

  async execute({
    context: { workspaceId },
  }: ToolExecuteArgs<typeof listRolesInputSchema>): Promise<ToolOutput> {
    const roles = await this.roleService.getWorkspaceRoles(workspaceId);

    return {
      success: true,
      message: `Found ${roles.length} role${roles.length === 1 ? '' : 's'}`,
      result: { roles: roles.map(toRoleSummary) },
    };
  }
}
