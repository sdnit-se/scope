import { useToast } from 'twenty-ui/components/feedback';
import { Section } from 'twenty-ui/components/layout';

import { useMutation, useQuery } from '@apollo/client/react';
import { t } from '@lingui/core/macro';
import { AI_MODEL_TIERS, type AiModelTier } from 'twenty-shared/ai';
import { isDefined } from 'twenty-shared/utils';
import { Card } from 'twenty-ui/primitives/surfaces';

import { getAiModelTierLabel } from '@/ai/utils/getAiModelTierLabel';
import { useClientConfig } from '@/client-config/hooks/useClientConfig';
import { SET_ADMIN_DEFAULT_AI_MODEL } from '@/settings/admin-panel/ai/graphql/mutations/setAdminDefaultAiModel';
import { GET_ADMIN_AI_MODELS } from '@/settings/admin-panel/ai/graphql/queries/getAdminAiModels';
import { useApolloAdminClient } from '@/settings/admin-panel/apollo/hooks/useApolloAdminClient';
import { AiModelPinSelect } from '@/ai/components/AiModelPinSelect';
import { SettingsOptionCardContentSelect } from '@/settings/components/SettingsOptions/SettingsOptionCardContentSelect';
import { StyledSettingsSelectGroup } from '@/settings/components/SettingsOptions/StyledSettingsSelectGroup';
import { SettingsSectionSkeletonLoader } from '@/settings/components/SettingsSectionSkeletonLoader';
import { GenericDropdownContentWidth } from '@/ui/layout/dropdown/constants/GenericDropdownContentWidth';
import {
  type AdminAiModelConfig,
  type AdminAiModelTierDefault,
  AiModelTier as GraphqlAiModelTier,
} from '~/generated-admin/graphql';

export const SettingsAdminAI = () => {
  const apolloAdminClient = useApolloAdminClient();
  const { enqueueToast } = useToast();
  const { refetch: refetchClientConfig } = useClientConfig();

  const { data, loading: isLoadingModels } = useQuery<{
    getAdminAiModels: {
      defaultModelByTier: AdminAiModelTierDefault[];
      models: AdminAiModelConfig[];
    };
  }>(GET_ADMIN_AI_MODELS, { client: apolloAdminClient });

  const [setDefaultModel] = useMutation(SET_ADMIN_DEFAULT_AI_MODEL, {
    client: apolloAdminClient,
  });

  const models = data?.getAdminAiModels?.models ?? [];

  if (isLoadingModels) {
    return <SettingsSectionSkeletonLoader />;
  }

  const defaultModelByTier = data?.getAdminAiModels?.defaultModelByTier ?? [];

  // Tier defaults answer chats and agent runs, so the server refuses evaluation models here.
  const enabledModels = models.filter(
    (model) =>
      model.kind === 'language' &&
      model.isAvailable &&
      model.isAdminEnabled &&
      !model.isDeprecated,
  );

  const handleDefaultModelChange = async (
    tier: AiModelTier,
    modelId: string,
  ) => {
    try {
      await setDefaultModel({
        variables: { tier: GraphqlAiModelTier[tier], modelId },
        refetchQueries: [{ query: GET_ADMIN_AI_MODELS }],
      });
      await refetchClientConfig();
    } catch {
      enqueueToast({
        status: 'error',
        children: t`Failed to update default model`,
      });
    }
  };

  return (
    <>
      {enabledModels.length > 0 && (
        <Section.Root>
          <Section.Header
            title={t`Default Models`}
            description={t`The model behind each mode for every workspace. Workspaces can pin their own.`}
          />

          <Card.Root>
            <StyledSettingsSelectGroup controlWidth={260}>
              {AI_MODEL_TIERS.map((tier, index) => (
                <SettingsOptionCardContentSelect
                  key={tier}
                  title={getAiModelTierLabel(tier)}
                  divider={index < AI_MODEL_TIERS.length - 1}
                >
                  <AiModelPinSelect
                    dropdownId={`admin-default-model-select-${tier}`}
                    modelId={
                      defaultModelByTier.find(
                        (defaultModel) => defaultModel.tier === tier,
                      )?.modelId ?? null
                    }
                    onChange={(modelId) => {
                      if (isDefined(modelId)) {
                        void handleDefaultModelChange(tier, modelId);
                      }
                    }}
                    aiModels={enabledModels}
                    selectSizeVariant="small"
                    dropdownWidth={GenericDropdownContentWidth.ExtraLarge}
                  />
                </SettingsOptionCardContentSelect>
              ))}
            </StyledSettingsSelectGroup>
          </Card.Root>
        </Section.Root>
      )}
    </>
  );
};
