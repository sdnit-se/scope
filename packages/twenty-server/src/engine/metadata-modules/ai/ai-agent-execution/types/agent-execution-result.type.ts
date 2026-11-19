import { type LanguageModelUsage, type StepResult, type ToolSet } from 'ai';

export type AgentExecutionResult = {
  result: object;
  usage: LanguageModelUsage;
  cacheCreationTokens: number;
  nativeWebSearchCallCount: number;
  isPaused: boolean;
  steps: StepResult<ToolSet>[];
  modelId: string;
  totalCostInDollars: number;
  creditsUsedMicro: number;
};
