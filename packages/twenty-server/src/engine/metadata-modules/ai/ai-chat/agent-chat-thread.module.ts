import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeORMModule } from 'src/database/typeorm/typeorm.module';
import { UserWorkspaceEntity } from 'src/engine/core-modules/user-workspace/user-workspace.entity';
import { UserWorkspaceModule } from 'src/engine/core-modules/user-workspace/user-workspace.module';
import { AgentChatThreadLifecycleModule } from 'src/engine/metadata-modules/ai/ai-chat/agent-chat-thread-lifecycle.module';
import { EndAgentChatChannelSnoozeJob } from 'src/engine/metadata-modules/ai/ai-chat/jobs/end-agent-chat-channel-snooze.job';
import { EndAgentChatThreadSnoozeJob } from 'src/engine/metadata-modules/ai/ai-chat/jobs/end-agent-chat-thread-snooze.job';
import { AgentChatChannelAccessService } from 'src/engine/metadata-modules/ai/ai-chat/services/agent-chat-channel-access.service';
import { AgentChatChannelService } from 'src/engine/metadata-modules/ai/ai-chat/services/agent-chat-channel.service';
import { AgentChatChannelThreadsService } from 'src/engine/metadata-modules/ai/ai-chat/services/agent-chat-channel-threads.service';
import { AgentChatThreadAccessService } from 'src/engine/metadata-modules/ai/ai-chat/services/agent-chat-thread-access.service';
import { AgentChatThreadParticipantEventService } from 'src/engine/metadata-modules/ai/ai-chat/services/agent-chat-thread-participant-event.service';
import { AgentChatThreadParticipantService } from 'src/engine/metadata-modules/ai/ai-chat/services/agent-chat-thread-participant.service';
import { AgentChatThreadTriageService } from 'src/engine/metadata-modules/ai/ai-chat/services/agent-chat-thread-triage.service';
import { AgentChatThreadService } from 'src/engine/metadata-modules/ai/ai-chat/services/agent-chat-thread.service';
import { AgentInboxService } from 'src/engine/metadata-modules/ai/ai-chat/services/agent-inbox.service';
import { AgentChatChannelModule } from 'src/engine/metadata-modules/agent-chat-channel/agent-chat-channel.module';
import { AgentHistoryModule } from 'src/engine/metadata-modules/ai/ai-history/ai-history.module';
import { PermissionsModule } from 'src/engine/metadata-modules/permissions/permissions.module';
import { WorkspaceCacheModule } from 'src/engine/workspace-cache/workspace-cache.module';

// separate from AiChatModule so workflow actions can message members' chats
// without its streaming, tool and workflow dependencies
@Module({
  imports: [
    AgentChatChannelModule,
    AgentChatThreadLifecycleModule,
    AgentHistoryModule,
    PermissionsModule,
    TypeORMModule,
    TypeOrmModule.forFeature([UserWorkspaceEntity]),
    UserWorkspaceModule,
    WorkspaceCacheModule,
  ],
  providers: [
    AgentChatChannelAccessService,
    AgentChatChannelService,
    AgentChatChannelThreadsService,
    AgentChatThreadAccessService,
    AgentChatThreadParticipantEventService,
    AgentChatThreadParticipantService,
    AgentChatThreadService,
    AgentChatThreadTriageService,
    AgentInboxService,
    EndAgentChatChannelSnoozeJob,
    EndAgentChatThreadSnoozeJob,
  ],
  exports: [
    AgentChatChannelService,
    AgentChatChannelThreadsService,
    AgentChatThreadAccessService,
    AgentChatThreadParticipantService,
    AgentChatThreadService,
    AgentChatThreadTriageService,
    AgentInboxService,
  ],
})
export class AgentChatThreadModule {}
