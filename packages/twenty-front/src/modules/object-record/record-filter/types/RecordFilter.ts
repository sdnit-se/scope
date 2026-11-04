import { type CompositeFieldSubFieldName } from '@/settings/data-model/types/CompositeFieldSubFieldName';
import {
  type FilterableAndTSVectorFieldType,
  type ViewFilterOperand,
} from 'twenty-shared/types';
import { type FILTER_OPERANDS_MAP } from 'twenty-shared/utils';

export type RecordFilter = {
  id: string;
  fieldMetadataId: string;
  value: string;
  /** @deprecated We shouldn't implement new features with this field and instead try to create utils to obtain the displayValue at runtime */
  displayValue: string;
  type: FilterableAndTSVectorFieldType;
  recordFilterGroupId?: string;
  displayAvatarUrl?: string;
  operand: ViewFilterOperand;
  positionInRecordFilterGroup?: number | null;
  label: string;
  subFieldName?: CompositeFieldSubFieldName | null | undefined;
  relationTargetFieldMetadataId?: string | null;
};

export type RecordFilterToRecordInputOperand<
  T extends FilterableAndTSVectorFieldType,
> = (typeof FILTER_OPERANDS_MAP)[T][number];
