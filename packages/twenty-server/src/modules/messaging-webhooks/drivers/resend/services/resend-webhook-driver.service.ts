import { Injectable } from '@nestjs/common';

import { isNonEmptyString } from '@sniptt/guards';
import { isDefined, parseJson } from 'twenty-shared/utils';

import { ResendWebhookVerifierService } from 'src/modules/messaging-webhooks/drivers/resend/services/resend-webhook-verifier.service';
import { type ResendWebhookHeaders } from 'src/modules/messaging-webhooks/drivers/resend/types/resend-webhook-headers.type';
import { type ResendWebhookEvent } from 'src/modules/messaging-webhooks/drivers/resend/types/resend-webhook-event.type';
import { InboundMailHandlerService } from 'src/modules/messaging-webhooks/handlers/inbound-mail-handler.service';
import { MessagingWebhookExceptionCode } from 'src/modules/messaging-webhooks/messaging-webhook-exception-code.enum';
import { MessagingWebhookException } from 'src/modules/messaging-webhooks/messaging-webhook.exception';
import { INBOUND_EMAIL_MESSAGE_SOURCE } from 'src/modules/messaging/message-import-manager/drivers/inbound-email/constants/inbound-email-message-source.constant';

@Injectable()
export class ResendWebhookDriverService {
  constructor(
    private readonly resendWebhookVerifierService: ResendWebhookVerifierService,
    private readonly inboundMailHandlerService: InboundMailHandlerService,
  ) {}

  async handle(rawBody: Buffer, headers: ResendWebhookHeaders): Promise<void> {
    this.resendWebhookVerifierService.assertSigned(rawBody, headers);

    const { svixId } = headers;

    if (!isNonEmptyString(svixId)) {
      throw new MessagingWebhookException(
        'Resend webhook payload has no svix-id header',
        MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_INVALID_PAYLOAD,
      );
    }

    const event = parseJson<ResendWebhookEvent>(rawBody.toString('utf8'));

    if (!isDefined(event) || !isNonEmptyString(event.type)) {
      throw new MessagingWebhookException(
        'Invalid Resend webhook payload',
        MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_INVALID_PAYLOAD,
      );
    }

    if (event.type === 'email.received') {
      await this.handleReceivedEvent(event);
    }
  }

  private async handleReceivedEvent(event: ResendWebhookEvent): Promise<void> {
    const emailId = event.data?.email_id;

    if (!isNonEmptyString(emailId)) {
      throw new MessagingWebhookException(
        'Resend email.received event has no email_id',
        MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_INVALID_PAYLOAD,
      );
    }

    // received_for has the envelope recipients; to/cc cover aliases and group expansion
    const recipients = [
      ...(event.data?.received_for ?? []),
      ...(event.data?.to ?? []),
      ...(event.data?.cc ?? []),
    ];

    await this.inboundMailHandlerService.handle({
      recipients,
      subject: event.data?.subject ?? null,
      message: {
        source: INBOUND_EMAIL_MESSAGE_SOURCE.RESEND,
        reference: emailId,
      },
      dedupeKey: emailId,
    });
  }
}
