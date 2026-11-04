import { ContextStoreComponentInstanceContext } from '@/context-store/states/contexts/ContextStoreComponentInstanceContext';
import { createAtomComponentState } from '@/ui/utilities/state/jotai/utils/createAtomComponentState';
import { type RecordGqlOperationFilter } from 'twenty-shared/types';

export const contextStoreAnyFieldFilterRelatedRecordFiltersComponentState =
  createAtomComponentState<RecordGqlOperationFilter[]>({
    key: 'contextStoreAnyFieldFilterRelatedRecordFiltersComponentState',
    defaultValue: [],
    componentInstanceContext: ContextStoreComponentInstanceContext,
  });
