import { flattenedFieldMetadataItemsSelector } from '@/object-metadata/states/flattenedFieldMetadataItemsSelector';
import { useDashboardPeriod } from '@/page-layout/dashboard-period/hooks/useDashboardPeriod';
import { applyDashboardPeriodToChartFilters } from '@/page-layout/dashboard-period/utils/applyDashboardPeriodToChartFilters';
import { type PageLayoutWidget } from '@/page-layout/types/PageLayoutWidget';
import { useCurrentWidget } from '@/page-layout/widgets/hooks/useCurrentWidget';
import { useUserTimezone } from '@/ui/input/components/internal/date/hooks/useUserTimezone';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useMemo } from 'react';
import { isDefined } from 'twenty-shared/utils';

// Charts read their configuration here, so the query and a bar's drill-down both get the period.
export const useCurrentWidgetWithDashboardPeriod = (): PageLayoutWidget => {
  const widget = useCurrentWidget();
  const { appliedPeriod } = useDashboardPeriod();
  const { userTimezone } = useUserTimezone();

  const flattenedFieldMetadataItems = useAtomStateValue(
    flattenedFieldMetadataItemsSelector,
  );

  return useMemo(() => {
    const configuration = widget.configuration;

    if (
      !isDefined(appliedPeriod) ||
      !isDefined(configuration) ||
      !('filter' in configuration) ||
      !isDefined(configuration.filter)
    ) {
      return widget;
    }

    return {
      ...widget,
      configuration: {
        ...configuration,
        filter: applyDashboardPeriodToChartFilters({
          chartFilters: configuration.filter,
          period: appliedPeriod,
          getFieldType: (fieldMetadataId) =>
            flattenedFieldMetadataItems.find(
              (fieldMetadataItem) => fieldMetadataItem.id === fieldMetadataId,
            )?.type,
          timeZone: userTimezone,
        }),
      },
    };
  }, [widget, appliedPeriod, flattenedFieldMetadataItems, userTimezone]);
};
