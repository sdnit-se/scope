import { type FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { isFieldMorphRelation } from '@/object-record/record-field/ui/types/guards/isFieldMorphRelation';
import { isFieldRelation } from '@/object-record/record-field/ui/types/guards/isFieldRelation';
import { isNonEmptyString } from '@sniptt/guards';
import { isDefined } from 'twenty-shared/utils';

// A chart grouped by the related record itself (no sub-field) knows each bar's record id, so its list can be opened.
export const isFilteredViewRedirectionSupported = (
  field: FieldMetadataItem | undefined,
  subFieldName?: string | null,
): boolean => {
  if (!isDefined(field) || isFieldMorphRelation(field)) {
    return false;
  }

  return !isFieldRelation(field) || !isNonEmptyString(subFieldName);
};
