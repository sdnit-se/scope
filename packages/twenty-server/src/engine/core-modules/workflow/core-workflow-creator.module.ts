import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkflowEntity } from 'src/engine/core-modules/workflow/entities/workflow.entity';
import { CoreWorkflowCreatorService } from 'src/engine/core-modules/workflow/services/core-workflow-creator.service';
import { provideWorkspaceScopedRepository } from 'src/engine/twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository';
import { WorkspaceCacheModule } from 'src/engine/workspace-cache/workspace-cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowEntity]), WorkspaceCacheModule],
  providers: [
    CoreWorkflowCreatorService,
    provideWorkspaceScopedRepository(WorkflowEntity),
  ],
  exports: [CoreWorkflowCreatorService],
})
export class CoreWorkflowCreatorModule {}
