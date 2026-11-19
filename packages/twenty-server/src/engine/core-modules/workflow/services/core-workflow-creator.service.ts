import { Injectable } from '@nestjs/common';

import { isDefined } from 'twenty-shared/utils';

import { WorkflowEntity } from 'src/engine/core-modules/workflow/entities/workflow.entity';
import { InjectWorkspaceScopedRepository } from 'src/engine/twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator';
import { type WorkspaceScopedRepository } from 'src/engine/twenty-orm/workspace-scoped-repository/workspace-scoped-repository';
import { WorkspaceCacheService } from 'src/engine/workspace-cache/services/workspace-cache.service';

@Injectable()
export class CoreWorkflowCreatorService {
  constructor(
    @InjectWorkspaceScopedRepository(WorkflowEntity)
    private readonly coreWorkflowRepository: WorkspaceScopedRepository<WorkflowEntity>,
    private readonly workspaceCacheService: WorkspaceCacheService,
  ) {}

  // a run's conversation goes to this member's inbox, until a workflow can name a team inbox
  async findCreatorWorkspaceMemberId({
    workspaceId,
    coreWorkflowId,
  }: {
    workspaceId: string;
    coreWorkflowId: string;
  }): Promise<string | null> {
    const coreWorkflow = await this.coreWorkflowRepository.findOne(
      workspaceId,
      {
        where: { id: coreWorkflowId },
        select: { id: true, createdByUserWorkspaceId: true },
        withDeleted: true,
      },
    );

    if (!isDefined(coreWorkflow?.createdByUserWorkspaceId)) {
      return null;
    }

    const { flatWorkspaceMemberMaps } =
      await this.workspaceCacheService.getOrRecompute(workspaceId, [
        'flatWorkspaceMemberMaps',
      ]);

    return (
      flatWorkspaceMemberMaps.idByUserWorkspaceId[
        coreWorkflow.createdByUserWorkspaceId
      ] ?? null
    );
  }
}
