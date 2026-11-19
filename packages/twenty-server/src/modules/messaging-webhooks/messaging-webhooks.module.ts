import { Module } from '@nestjs/common';

import { ResendWebhookDriverService } from 'src/modules/messaging-webhooks/drivers/resend/services/resend-webhook-driver.service';
import { ResendWebhookVerifierService } from 'src/modules/messaging-webhooks/drivers/resend/services/resend-webhook-verifier.service';
import { SesInboundWebhookDriverService } from 'src/modules/messaging-webhooks/drivers/aws-ses/services/ses-inbound-webhook-driver.service';
import { SnsEnvelopeService } from 'src/modules/messaging-webhooks/drivers/aws-ses/services/sns-envelope.service';
import { SnsSignatureVerifierService } from 'src/modules/messaging-webhooks/drivers/aws-ses/services/sns-signature-verifier.service';
import { SnsSubscriptionConfirmerService } from 'src/modules/messaging-webhooks/drivers/aws-ses/services/sns-subscription-confirmer.service';
import { InboundMailHandlerService } from 'src/modules/messaging-webhooks/handlers/inbound-mail-handler.service';
import { MessagingWebhooksController } from 'src/modules/messaging-webhooks/messaging-webhooks.controller';

@Module({
  controllers: [MessagingWebhooksController],
  providers: [
    InboundMailHandlerService,
    SnsEnvelopeService,
    SnsSignatureVerifierService,
    SnsSubscriptionConfirmerService,
    SesInboundWebhookDriverService,
    ResendWebhookVerifierService,
    ResendWebhookDriverService,
  ],
})
export class MessagingWebhooksModule {}
