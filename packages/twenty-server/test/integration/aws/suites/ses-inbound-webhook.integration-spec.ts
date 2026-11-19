import { randomUUID } from 'node:crypto';

import { http, HttpResponse } from 'msw';
import request from 'supertest';

import {
  snsNotification,
  snsSigningCertHandler,
  snsSubscriptionConfirmation,
} from 'test/integration/aws/mocks/sns-payload.util';
import { updateConfigVariable } from 'test/integration/twenty-config/utils/update-config-variable.util';
import { setupHttpMock } from 'test/integration/utils/http-mock.util';

const ALLOWED_TOPIC_ARN =
  'arn:aws:sns:eu-west-3:000000000000:twenty-ses-inbound-test';

const SES_INBOUND_WEBHOOK_PATH = '/webhooks/messaging/ses/inbound';

const SUBSCRIBE_URL =
  'https://sns.eu-west-3.amazonaws.com/?Action=ConfirmSubscription&Token=test-token';

const inboundNotification = ({
  recipients,
  subject,
  actionType = 'S3',
}: {
  recipients: string[];
  subject?: string;
  actionType?: string;
}) => ({
  mail: { commonHeaders: { subject } },
  receipt: {
    recipients,
    action: { type: actionType, objectKey: `inbound/${randomUUID()}` },
  },
});

const postSesInboundWebhook = (payload: Record<string, string>) =>
  request(`http://localhost:${APP_PORT}`)
    .post(SES_INBOUND_WEBHOOK_PATH)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(payload));

describe('SES inbound webhook (integration)', () => {
  const httpMock = setupHttpMock(snsSigningCertHandler());

  beforeAll(async () => {
    await updateConfigVariable({
      input: { key: 'SES_SNS_TOPIC_ARN_ALLOWLIST', value: ALLOWED_TOPIC_ARN },
    });
  }, 60000);

  it('ignores an inbound email delivered through an unsupported action', async () => {
    const response = await postSesInboundWebhook(
      snsNotification({
        topicArn: ALLOWED_TOPIC_ARN,
        message: inboundNotification({
          recipients: ['sales@campaigns.acme.com'],
          actionType: 'Lambda',
        }),
      }),
    );

    expect(response.status).toBe(200);
  }, 60000);

  it('confirms an SNS subscription by calling the subscribe URL', async () => {
    let subscribeUrlWasCalled = false;

    httpMock.use(
      http.get(SUBSCRIBE_URL, () => {
        subscribeUrlWasCalled = true;

        return HttpResponse.text('<ConfirmSubscriptionResponse />');
      }),
    );

    const response = await postSesInboundWebhook(
      snsSubscriptionConfirmation({
        topicArn: ALLOWED_TOPIC_ARN,
        subscribeUrl: SUBSCRIBE_URL,
      }),
    );

    expect(response.status).toBe(200);
    expect(subscribeUrlWasCalled).toBe(true);
  }, 60000);

  it('rejects an inbound notification from a topic outside the allowlist', async () => {
    const response = await postSesInboundWebhook(
      snsNotification({
        topicArn: 'arn:aws:sns:eu-west-3:000000000000:some-other-topic',
        message: inboundNotification({
          recipients: ['sales@campaigns.acme.com'],
        }),
      }),
    );

    expect(response.status).toBe(403);
  }, 60000);

  it('rejects an inbound body that is not valid JSON', async () => {
    const response = await request(`http://localhost:${APP_PORT}`)
      .post(SES_INBOUND_WEBHOOK_PATH)
      .set('Content-Type', 'application/json')
      .send('not-json');

    expect(response.status).toBe(400);
  }, 60000);

  it('rejects an inbound notification whose signature does not verify', async () => {
    const response = await postSesInboundWebhook(
      snsNotification({
        topicArn: ALLOWED_TOPIC_ARN,
        signed: false,
        message: inboundNotification({
          recipients: ['sales@campaigns.acme.com'],
        }),
      }),
    );

    expect(response.status).toBe(403);
  }, 60000);
});
