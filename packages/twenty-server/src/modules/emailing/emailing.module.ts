import { Module } from '@nestjs/common';

import { CoreCommonApiModule } from 'src/engine/api/common/core-common-api.module';
import { ActorModule } from 'src/engine/core-modules/actor/actor.module';
import { CacheLockModule } from 'src/engine/core-modules/cache-lock/cache-lock.module';
import { RecordCrudModule } from 'src/engine/core-modules/record-crud/record-crud.module';
import { UserWorkspaceModule } from 'src/engine/core-modules/user-workspace/user-workspace.module';
import { AddPeopleToMessageListJobService } from 'src/modules/emailing/services/add-people-to-message-list-job.service';
import { AddPeopleToMessageListService } from 'src/modules/emailing/services/add-people-to-message-list.service';
import { PermissionsModule } from 'src/engine/metadata-modules/permissions/permissions.module';
import { UserRoleModule } from 'src/engine/metadata-modules/user-role/user-role.module';
import { WorkspaceManyOrAllFlatEntityMapsCacheModule } from 'src/engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module';
import { WorkspaceCacheModule } from 'src/engine/workspace-cache/workspace-cache.module';
import { MessageListResolver } from 'src/modules/emailing/resolvers/message-list.resolver';
import { CampaignVariableService } from 'src/modules/emailing/services/campaign-variable.service';
import { MessageCampaignDraftService } from 'src/modules/emailing/services/message-campaign-draft.service';
import { MessageListDuplicationService } from 'src/modules/emailing/services/message-list-duplication.service';
import { SaveCampaignTool } from 'src/modules/emailing/tools/save-campaign-tool';

@Module({
  imports: [
    ActorModule,
    CacheLockModule,
    CoreCommonApiModule,
    RecordCrudModule,
    UserWorkspaceModule,
    PermissionsModule,
    UserRoleModule,
    WorkspaceCacheModule,
    WorkspaceManyOrAllFlatEntityMapsCacheModule,
  ],
  providers: [
    CampaignVariableService,
    MessageCampaignDraftService,
    SaveCampaignTool,
    MessageListDuplicationService,
    AddPeopleToMessageListService,
    AddPeopleToMessageListJobService,
    MessageListResolver,
  ],
  exports: [AddPeopleToMessageListService, SaveCampaignTool],
})
export class EmailingModule {}
