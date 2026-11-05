import {
  FieldDateDisplayFormat,
  type FieldDateMetadataSettings,
} from '@/object-record/record-field/ui/types/FieldMetadata';

// Swedish standard dates, day only; a field set to show "in 3 days" keeps that.
export const getSimpleModeDateFieldSettings = (
  dateFieldSettings?: FieldDateMetadataSettings,
): FieldDateMetadataSettings =>
  dateFieldSettings?.displayFormat === FieldDateDisplayFormat.RELATIVE
    ? dateFieldSettings
    : {
        displayFormat: FieldDateDisplayFormat.CUSTOM,
        customUnicodeDateFormat: 'yyyy-MM-dd',
      };
