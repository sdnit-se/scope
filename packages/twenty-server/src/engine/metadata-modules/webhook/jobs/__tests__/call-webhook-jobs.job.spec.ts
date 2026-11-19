import { Test } from '@nestjs/testing';
import { MessageQueue } from 'src/engine/core-modules/message-queue/message-queue.constants';
import { getQueueToken } from 'src/engine/core-modules/message-queue/utils/get-queue-token.util';
import { COMPANY_FLAT_OBJECT_MOCK } from 'src/engine/metadata-modules/flat-object-metadata/__mocks__/company-flat-object.mock';
import { CallWebhookJobsJob } from 'src/engine/metadata-modules/webhook/jobs/call-webhook-jobs.job';
import { WorkspaceCacheService } from 'src/engine/workspace-cache/services/workspace-cache.service';

describe('CallWebhookJobsJob', () => {
  it('sends every change on an object to each webhook naming it', async () => {
    const add = jest.fn();
    const objectMetadata = COMPANY_FLAT_OBJECT_MOCK;
    const module = await Test.createTestingModule({
      providers: [
        CallWebhookJobsJob,
        {
          provide: getQueueToken(MessageQueue.webhookQueue),
          useValue: { add },
        },
        {
          provide: WorkspaceCacheService,
          useValue: {
            getOrRecompute: jest.fn().mockResolvedValue({
              flatWebhookMaps: {
                byUniversalIdentifier: {
                  webhook: {
                    id: 'webhook',
                    targetUrl: 'https://example.com/hook',
                    secret: 'secret',
                    operations: ['company.created'],
                  },
                },
                universalIdentifierById: {},
                universalIdentifiersByApplicationId: {},
              },
            }),
          },
        },
      ],
    }).compile();

    await module.get(CallWebhookJobsJob).handle({
      name: 'company.created',
      workspaceId: objectMetadata.workspaceId,
      objectMetadata,
      events: ['record-1', 'record-2'].map((recordId) => ({
        recordId,
        properties: { after: { id: recordId } },
      })),
    });

    expect(add).toHaveBeenCalledTimes(1);
    expect(
      (
        add.mock.calls[0][1] as { webhookId: string; record: { id: string } }[]
      ).map(({ webhookId, record }) => [webhookId, record.id]),
    ).toEqual([
      ['webhook', 'record-1'],
      ['webhook', 'record-2'],
    ]);

    await module.close();
  });
});
