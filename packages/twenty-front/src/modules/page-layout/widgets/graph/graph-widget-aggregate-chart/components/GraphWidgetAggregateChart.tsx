import { formatNumberChartTrend } from '@/page-layout/widgets/graph/graph-widget-aggregate-chart/utils/formatNumberChartTrend';
import { styled } from '@linaria/react';
import { isDefined } from 'twenty-shared/utils';
import { IconTrendingDown, IconTrendingUp } from 'twenty-ui/icon';
import { Heading } from 'twenty-ui/primitives/typography';
import { useTheme, themeCssVariables } from 'twenty-ui/theme';
import { ONE_ROW_WIDGET_CARD_MAX_HEIGHT } from '@/page-layout/widgets/widget-card/constants/OneRowWidgetCardMaxHeight';
import { WIDGET_CARD_CONTAINER_NAME } from '@/page-layout/widgets/widget-card/constants/WidgetCardContainerName';
type GraphWidgetAggregateChartProps = {
  value: string | number;
  trendPercentage?: number;
  prefix?: string;
  suffix?: string;
};

const StyledTrendPercentageValue = styled.span`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.xs};
  font-weight: ${themeCssVariables.font.weight.regular};
  margin-right: ${themeCssVariables.spacing[2]};
`;

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  width: 100%;

  // A one-row tile shows its number beside the title instead of under it.
  @container ${WIDGET_CARD_CONTAINER_NAME} (max-height: ${ONE_ROW_WIDGET_CARD_MAX_HEIGHT}) {
    height: ${themeCssVariables.spacing[6]};
    inset: var(--widget-card-title-padding-top)
      var(--widget-card-padding-inline) auto auto;
    justify-content: flex-end;
    max-width: var(--widget-card-inline-value-width);
    overflow: hidden;
    position: absolute;
    width: auto;

    h2 {
      font-size: ${themeCssVariables.font.size.xl};
    }
  }
`;

const StyledTrendIconContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const GraphWidgetAggregateChart = ({
  value,
  trendPercentage,
  prefix,
  suffix,
}: GraphWidgetAggregateChartProps) => {
  const theme = useTheme();

  const formattedPercentage = isDefined(trendPercentage)
    ? formatNumberChartTrend(trendPercentage)
    : undefined;

  const displayValue = `${prefix ?? ''}${value}${suffix ?? ''}`;

  return (
    <StyledContainer data-widget-card-inline-value>
      <Heading level={2} size="xxl">
        {displayValue}
      </Heading>
      {isDefined(trendPercentage) && (
        <StyledTrendIconContainer>
          <StyledTrendPercentageValue>
            {formattedPercentage}%
          </StyledTrendPercentageValue>
          {trendPercentage >= 0 ? (
            <IconTrendingUp
              color={theme.color.turquoise8}
              size={theme.icon.size.md}
            />
          ) : (
            <IconTrendingDown
              color={theme.color.red8}
              size={theme.icon.size.md}
            />
          )}
        </StyledTrendIconContainer>
      )}
    </StyledContainer>
  );
};
