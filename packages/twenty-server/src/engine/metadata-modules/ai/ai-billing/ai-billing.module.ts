import { Module } from '@nestjs/common';

import { AiBillingService } from 'src/engine/metadata-modules/ai/ai-billing/services/ai-billing.service';

@Module({
  providers: [AiBillingService],
  exports: [AiBillingService],
})
export class AiBillingModule {}
