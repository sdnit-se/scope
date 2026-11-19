import chunk from 'lodash.chunk';

import type { ObjectRecordEvent } from 'twenty-shared/database-events';

import { InjectMessageQueue } from 'src/engine/core-modules/message-queue/decorators/message-queue.decorator';
import { Process } from 'src/engine/core-modules/message-queue/decorators/process.decorator';
import { Processor } from 'src/engine/core-modules/message-queue/decorators/processor.decorator';
import { MessageQueue } from 'src/engine/core-modules/message-queue/message-queue.constants';
import { MessageQueueService } from 'src/engine/core-modules/message-queue/services/message-queue.service';
import { CallWebhookJob } from 'src/engine/metadata-modules/webhook/jobs/call-webhook.job';
import { type CallWebhookJobData } from 'src/engine/metadata-modules/webhook/types/webhook-job-data.type';
import { type WorkspaceEventBatchForWebhook } from 'src/engine/metadata-modules/webhook/types/workspace-event-batch-for-webhook.type';
import { findWebhooksMatchingEventName } from 'src/engine/metadata-modules/webhook/utils/find-webhooks-matching-event-name.util';
import { transformEventBatchToWebhookEvents } from 'src/engine/metadata-modules/webhook/utils/transform-event-batch-to-webhook-events';
import { WorkspaceCacheService } from 'src/engine/workspace-cache/services/workspace-cache.service';

const WEBHOOK_JOBS_CHUNK_SIZE = 20;

@Processor(MessageQueue.webhookQueue)
export class CallWebhookJobsJob {
  constructor(
    @InjectMessageQueue(MessageQueue.webhookQueue)
    private readonly messageQueueService: MessageQueueService,
    private readonly workspaceCacheService: WorkspaceCacheService,
  ) {}

  @Process(CallWebhookJobsJob.name)
  async handle(
    workspaceEventBatch: WorkspaceEventBatchForWebhook<ObjectRecordEvent>,
  ): Promise<void> {
    // Keep in sync with packages/twenty-zapier/src/triggers/trigger_record.ts and computeWebhooks.utils.ts

    const { flatWebhookMaps } = await this.workspaceCacheService.getOrRecompute(
      workspaceEventBatch.workspaceId,
      ['flatWebhookMaps'],
    );

    const webhooks = findWebhooksMatchingEventName({
      flatWebhookMaps,
      eventName: workspaceEventBatch.name,
    });

    if (webhooks.length === 0) {
      return;
    }

    // A webhook has no role: it hears every change on the objects it names
    const webhookEvents = transformEventBatchToWebhookEvents({
      workspaceEventBatch,
      webhooks,
    });

    const webhookEventsChunks = chunk(webhookEvents, WEBHOOK_JOBS_CHUNK_SIZE);

    for (const webhookEventsChunk of webhookEventsChunks) {
      await this.messageQueueService.add<CallWebhookJobData[]>(
        CallWebhookJob.name,
        webhookEventsChunk,
        {
          retryLimit: 3,
          workspaceId: workspaceEventBatch.workspaceId,
          isWorkspaceJob: true,
        },
      );
    }
  }
}
