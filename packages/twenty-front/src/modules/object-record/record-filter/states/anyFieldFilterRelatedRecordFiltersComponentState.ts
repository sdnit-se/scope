import { RecordFiltersComponentInstanceContext } from '@/object-record/record-filter/states/context/RecordFiltersComponentInstanceContext';
import { createAtomComponentState } from '@/ui/utilities/state/jotai/utils/createAtomComponentState';
import { type RecordGqlOperationFilter } from 'twenty-shared/types';

// Per relation field: the any-field search matched through it, such as people at a company whose name contains the value.
export const anyFieldFilterRelatedRecordFiltersComponentState =
  createAtomComponentState<
    Record<string, { filterValue: string; filter: RecordGqlOperationFilter }>
  >({
    key: 'anyFieldFilterRelatedRecordFiltersComponentState',
    defaultValue: {},
    componentInstanceContext: RecordFiltersComponentInstanceContext,
  });
