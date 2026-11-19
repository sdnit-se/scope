import { EngineComponentKey } from '~/generated-metadata/graphql';

export const REMOVED_ENGINE_COMPONENT_KEYS = new Set<EngineComponentKey>([
  EngineComponentKey.SEND_MESSAGE_CAMPAIGN,
  EngineComponentKey.SEND_MESSAGE_CAMPAIGN_TEST,
  EngineComponentKey.CANCEL_MESSAGE_CAMPAIGN,
  EngineComponentKey.SHARE_RECORD,
]);
