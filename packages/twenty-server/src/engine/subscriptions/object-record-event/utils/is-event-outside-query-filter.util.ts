import {
  FieldMetadataType,
  type RecordGqlOperationFilter,
} from 'twenty-shared/types';
import {
  COMPOSITE_FIELD_SUB_FIELD_MATCHERS_MAP,
  computeRelationGqlFieldJoinColumnName,
  isDefined,
  isFieldReferenceFilterOperator,
  isMatchingArrayFilter,
  isMatchingBooleanFilter,
  isMatchingCompositeFilter,
  isMatchingCurrencyFilter,
  isMatchingDateFilter,
  isMatchingFilesFilter,
  isMatchingFloatFilter,
  isMatchingMultiSelectFilter,
  isMatchingRatingFilter,
  isMatchingRawJsonFilter,
  isMatchingRichTextFilter,
  isMatchingSelectFilter,
  isMatchingStringFilter,
  isMatchingTSVectorFilter,
  isMatchingUUIDFilter,
} from 'twenty-shared/utils';

import { type FlatEntityMaps } from 'src/engine/metadata-modules/flat-entity/types/flat-entity-maps.type';
import { findFlatEntityByIdInFlatEntityMaps } from 'src/engine/metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util';
import { type FlatFieldMetadata } from 'src/engine/metadata-modules/flat-field-metadata/types/flat-field-metadata.type';
import { type FlatObjectMetadata } from 'src/engine/metadata-modules/flat-object-metadata/types/flat-object-metadata.type';

type FilterMatch = 'match' | 'miss' | 'unknown';

type FilterField = Pick<FlatFieldMetadata, 'type' | 'options'>;

type LeafMatcher = (filter: never, value: never, options: never) => boolean;

const LEAF_MATCHERS: Partial<Record<FieldMetadataType, LeafMatcher>> = {
  [FieldMetadataType.TEXT]: (stringFilter, value) =>
    isMatchingStringFilter({ stringFilter, value }),
  [FieldMetadataType.RICH_TEXT]: (richTextFilter, value) =>
    isMatchingRichTextFilter({ richTextFilter, value }),
  [FieldMetadataType.RATING]: (ratingFilter, value, options) =>
    isMatchingRatingFilter({ ratingFilter, value, options }),
  [FieldMetadataType.SELECT]: (selectFilter, value, options) =>
    isMatchingSelectFilter({ selectFilter, value, options }),
  [FieldMetadataType.MULTI_SELECT]: (multiSelectFilter, value) =>
    isMatchingMultiSelectFilter({ multiSelectFilter, value }),
  [FieldMetadataType.ARRAY]: (arrayFilter, value) =>
    isMatchingArrayFilter({ arrayFilter, value }),
  [FieldMetadataType.RAW_JSON]: (rawJsonFilter, value) =>
    isMatchingRawJsonFilter({ rawJsonFilter, value }),
  [FieldMetadataType.FILES]: (filesFilter, value) =>
    isMatchingFilesFilter({ filesFilter, value }),
  [FieldMetadataType.DATE]: (dateFilter, value) =>
    isMatchingDateFilter({ dateFilter, value }),
  [FieldMetadataType.DATE_TIME]: (dateFilter, value) =>
    isMatchingDateFilter({ dateFilter, value }),
  [FieldMetadataType.NUMBER]: (floatFilter, value) =>
    isMatchingFloatFilter({ floatFilter, value }),
  [FieldMetadataType.NUMERIC]: (floatFilter, value) =>
    isMatchingFloatFilter({ floatFilter, value }),
  [FieldMetadataType.POSITION]: (floatFilter, value) =>
    isMatchingFloatFilter({ floatFilter, value }),
  [FieldMetadataType.UUID]: (uuidFilter, value) =>
    isMatchingUUIDFilter({ uuidFilter, value }),
  [FieldMetadataType.BOOLEAN]: (booleanFilter, value) =>
    isMatchingBooleanFilter({ booleanFilter, value }),
  [FieldMetadataType.CURRENCY]: (currencyFilter, value) =>
    isMatchingCurrencyFilter({ currencyFilter, value }),
  [FieldMetadataType.TS_VECTOR]: (tsVectorFilter, value) =>
    isMatchingTSVectorFilter({ tsVectorFilter, value }),
};

const every = (results: FilterMatch[]): FilterMatch =>
  results.includes('miss')
    ? 'miss'
    : results.every((result) => result === 'match')
      ? 'match'
      : 'unknown';

const some = (results: FilterMatch[]): FilterMatch =>
  results.length === 0 || results.includes('match')
    ? 'match'
    : results.every((result) => result === 'miss')
      ? 'miss'
      : 'unknown';

const negate = (result: FilterMatch): FilterMatch =>
  result === 'match' ? 'miss' : result === 'miss' ? 'match' : 'unknown';

const isFilterObject = (value: unknown): value is Record<string, unknown> =>
  isDefined(value) && typeof value === 'object' && !Array.isArray(value);

// Relations filter by their join column; filters through a relation stay unknown
export const buildFilterFieldsByKey = ({
  objectMetadata,
  flatFieldMetadataMaps,
}: {
  objectMetadata: Pick<FlatObjectMetadata, 'fieldIds'>;
  flatFieldMetadataMaps: FlatEntityMaps<FlatFieldMetadata>;
}): Map<string, FilterField> =>
  new Map(
    objectMetadata.fieldIds.flatMap((fieldId): [string, FilterField][] => {
      const field = findFlatEntityByIdInFlatEntityMaps({
        flatEntityId: fieldId,
        flatEntityMaps: flatFieldMetadataMaps,
      });

      if (!isDefined(field)) {
        return [];
      }

      return field.type === FieldMetadataType.RELATION
        ? [
            [
              computeRelationGqlFieldJoinColumnName({ name: field.name }),
              { type: FieldMetadataType.UUID, options: null },
            ],
          ]
        : [[field.name, field]];
    }),
  );

const matchLeaf = (
  record: Record<string, unknown>,
  key: string,
  filter: unknown,
  fieldsByKey: Map<string, FilterField>,
): FilterMatch => {
  const field = fieldsByKey.get(key);

  if (!isFilterObject(filter)) {
    return 'unknown';
  }

  if (Object.keys(filter).length === 0) {
    return 'match';
  }

  if (
    !isDefined(field) ||
    !(key in record) ||
    Object.keys(filter).some(isFieldReferenceFilterOperator)
  ) {
    return 'unknown';
  }

  const subFieldMatchers = COMPOSITE_FIELD_SUB_FIELD_MATCHERS_MAP[field.type];
  const matcher = LEAF_MATCHERS[field.type];

  try {
    if (isDefined(subFieldMatchers)) {
      return isMatchingCompositeFilter({
        compositeFilter: filter as never,
        compositeValue: record[key] as never,
        subFieldMatchers,
      })
        ? 'match'
        : 'miss';
    }

    if (!isDefined(matcher)) {
      return 'unknown';
    }

    return matcher(
      filter as never,
      record[key] as never,
      field.options as never,
    )
      ? 'match'
      : 'miss';
  } catch {
    return 'unknown';
  }
};

const matchFilter = (
  record: Record<string, unknown>,
  filter: unknown,
  fieldsByKey: Map<string, FilterField>,
): FilterMatch => {
  if (!isFilterObject(filter)) {
    return 'unknown';
  }

  const entries = Object.entries(filter);

  if (entries.length !== 1) {
    return every(
      entries.map(([key, value]) =>
        matchFilter(record, { [key]: value }, fieldsByKey),
      ),
    );
  }

  const [[key, value]] = entries;
  const recurse = (subFilter: unknown) =>
    matchFilter(record, subFilter, fieldsByKey);

  switch (key) {
    case 'and':
      return Array.isArray(value) ? every(value.map(recurse)) : 'unknown';
    case 'or':
      return Array.isArray(value) ? some(value.map(recurse)) : recurse(value);
    case 'not':
      return isFilterObject(value) && Object.keys(value).length === 0
        ? 'match'
        : negate(recurse(value));
    default:
      return matchLeaf(record, key, value, fieldsByKey);
  }
};

// A record the API hides because it is soft-deleted is a miss unless the filter asks about deletedAt
const matchRecord = (
  record: unknown,
  filter: RecordGqlOperationFilter,
  fieldsByKey: Map<string, FilterField>,
): FilterMatch => {
  if (!isFilterObject(record)) {
    return 'unknown';
  }

  if (
    isDefined(record.deletedAt) &&
    !JSON.stringify(filter).includes('"deletedAt"')
  ) {
    return 'miss';
  }

  return matchFilter(record, filter, fieldsByKey);
};

// True only when neither state of the record can be in the query's results; when unsure, the change is sent
export const isEventOutsideQueryFilter = ({
  properties,
  filter,
  fieldsByKey,
}: {
  properties: { before?: unknown; after?: unknown };
  filter: RecordGqlOperationFilter | undefined;
  fieldsByKey: Map<string, FilterField>;
}): boolean => {
  if (!isDefined(filter)) {
    return false;
  }

  const states = [properties.before, properties.after].filter(isDefined);

  return (
    states.length > 0 &&
    states.every((state) => matchRecord(state, filter, fieldsByKey) === 'miss')
  );
};
