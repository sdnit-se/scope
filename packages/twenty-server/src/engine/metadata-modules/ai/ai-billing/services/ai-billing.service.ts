import { Injectable } from '@nestjs/common';

import { type BillableStep } from 'src/engine/metadata-modules/ai/ai-billing/types/billable-step.type';
import { computeStepCostBreakdown } from 'src/engine/metadata-modules/ai/ai-billing/utils/compute-step-cost-breakdown.util';
import { extractCacheCreationTokens } from 'src/engine/metadata-modules/ai/ai-billing/utils/extract-cache-creation-tokens.util';
import { AiModelRegistryService } from 'src/engine/metadata-modules/ai/ai-models/services/ai-model-registry.service';
import { type AiModelCostConfig } from 'src/engine/metadata-modules/ai/ai-models/types/ai-model-cost-config.type';
import { type ModelId } from 'src/engine/metadata-modules/ai/ai-models/types/model-id.type';

@Injectable()
export class AiBillingService {
  constructor(
    private readonly aiModelRegistryService: AiModelRegistryService,
  ) {}

  // evaluation models first: getEffectiveModelConfig throws on ids outside its registry
  private getCostConfig(modelId: ModelId): AiModelCostConfig {
    return (
      this.aiModelRegistryService.getEvaluationModelConfig(modelId) ??
      this.aiModelRegistryService.getEffectiveModelConfig(modelId)
    );
  }

  calculateStepsCost(modelId: ModelId, steps: BillableStep[]): number {
    const model = this.getCostConfig(modelId);

    return steps.reduce(
      (costInDollars, step) =>
        costInDollars +
        computeStepCostBreakdown(model, {
          usage: step.usage,
          cacheCreationTokens: extractCacheCreationTokens(
            step.providerMetadata,
          ),
        }).totalCostInDollars,
      0,
    );
  }
}
