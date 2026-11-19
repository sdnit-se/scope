import { createHmac, randomUUID } from 'node:crypto';

import request from 'supertest';

import { SEED_APPLE_WORKSPACE_ID } from 'src/engine/workspace-manager/dev-seeder/core/constants/seeder-workspaces.constant';
import { getWorkspaceSchemaName } from 'src/engine/workspace-datasource/utils/get-workspace-schema-name.util';

import { updateConfigVariable } from 'test/integration/twenty-config/utils/update-config-variable.util';

const SECRET_BYTES = Buffer.from('resend-integration-signing-secret');
const SIGNING_SECRET = `whsec_${SECRET_BYTES.toString('base64')}`;

const RESEND_WEBHOOK_PATH = '/webhooks/messaging/resend';

const SETTLE_MS = 5_000;

const signRawBody = ({
  svixId,
  svixTimestamp,
  rawBody,
}: {
  svixId: string;
  svixTimestamp: string;
  rawBody: string;
}) =>
  createHmac('sha256', SECRET_BYTES)
    .update(`${svixId}.${svixTimestamp}.${rawBody}`)
    .digest('base64');

const postResendWebhook = (
  rawBody: string,
  { signed = true }: { signed?: boolean } = {},
) => {
  const svixId = `msg_${randomUUID()}`;
  const svixTimestamp = `${Math.floor(Date.now() / 1000)}`;
  const signature = signed
    ? signRawBody({ svixId, svixTimestamp, rawBody })
    : Buffer.from('invalid-signature-material').toString('base64');

  return request(`http://localhost:${APP_PORT}`)
    .post(RESEND_WEBHOOK_PATH)
    .set('Content-Type', 'application/json')
    .set('svix-id', svixId)
    .set('svix-timestamp', svixTimestamp)
    .set('svix-signature', `v1,${signature}`)
    .send(rawBody);
};

describe('Resend webhook (integration)', () => {
  const countSuppressions = async (emailAddress: string) => {
    const [{ count }] = await global.testDataSource.query(
      `SELECT COUNT(*)::int AS count FROM "${getWorkspaceSchemaName(SEED_APPLE_WORKSPACE_ID)}"."messageSuppression" WHERE "emailAddress" = $1`,
      [emailAddress],
    );

    return count;
  };

  beforeAll(async () => {
    await updateConfigVariable({
      input: { key: 'RESEND_WEBHOOK_SIGNING_SECRET', value: SIGNING_SECRET },
    });
  }, 60000);

  it('accepts a signed bounce and records nothing, since Twenty sends no campaigns', async () => {
    const emailAddress = `bounce-${randomUUID()}@acme.com`;

    const response = await postResendWebhook(
      JSON.stringify({
        type: 'email.bounced',
        data: {
          email_id: `email_${randomUUID()}`,
          to: [emailAddress],
          bounce: { type: 'Permanent' },
          tags: { workspace_id: SEED_APPLE_WORKSPACE_ID },
        },
      }),
    );

    expect(response.status).toBe(200);

    await new Promise((resolve) => setTimeout(resolve, SETTLE_MS));

    expect(await countSuppressions(emailAddress)).toBe(0);
  }, 60000);

  it('ignores event types it does not handle', async () => {
    const response = await postResendWebhook(
      JSON.stringify({
        type: 'email.delivered',
        data: { email_id: `email_${randomUUID()}` },
      }),
    );

    expect(response.status).toBe(200);
  }, 60000);

  it('rejects a payload whose signature does not verify', async () => {
    const response = await postResendWebhook(
      JSON.stringify({
        type: 'email.bounced',
        data: {
          email_id: `email_${randomUUID()}`,
          to: [`rejected-${randomUUID()}@acme.com`],
          bounce: { type: 'Permanent' },
          tags: { workspace_id: SEED_APPLE_WORKSPACE_ID },
        },
      }),
      { signed: false },
    );

    expect(response.status).toBe(403);
  }, 60000);

  it('rejects a payload without Svix signature headers', async () => {
    const response = await request(`http://localhost:${APP_PORT}`)
      .post(RESEND_WEBHOOK_PATH)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ type: 'email.bounced' }));

    expect(response.status).toBe(403);
  }, 60000);

  it('rejects a correctly signed body that is not valid JSON', async () => {
    const response = await postResendWebhook('not-json');

    expect(response.status).toBe(400);
  }, 60000);
});
