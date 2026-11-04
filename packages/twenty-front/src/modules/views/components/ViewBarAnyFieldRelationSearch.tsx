import { useObjectMetadataItems } from '@/object-metadata/hooks/useObjectMetadataItems';
import { type FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { isManyToOneRelationField } from '@/object-metadata/utils/isManyToOneRelationField';
import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';
import { anyFieldFilterRelatedRecordFiltersComponentState } from '@/object-record/record-filter/states/anyFieldFilterRelatedRecordFiltersComponentState';
import { anyFieldFilterValueComponentState } from '@/object-record/record-filter/states/anyFieldFilterValueComponentState';
import { useRecordIndexContextOrThrow } from '@/object-record/record-index/contexts/RecordIndexContext';
import { getForeignKeyNameFromRelationFieldName } from '@/object-record/utils/getForeignKeyNameFromRelationFieldName';
import { useAtomComponentStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateValue';
import { useSetAtomComponentState } from '@/ui/utilities/state/jotai/hooks/useSetAtomComponentState';
import { isNonEmptyString } from '@sniptt/guards';
import { useEffect } from 'react';
import { FieldMetadataType } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';

// The most related records one search matches through a relation; enough for a company name.
const RELATED_RECORDS_LIMIT = 100;

type ViewBarAnyFieldRelationMatchEffectProps = {
  relationFieldName: string;
  targetObjectNameSingular: string;
  targetLabelFieldName: string;
  filterValue: string;
};

const ViewBarAnyFieldRelationMatchEffect = ({
  relationFieldName,
  targetObjectNameSingular,
  targetLabelFieldName,
  filterValue,
}: ViewBarAnyFieldRelationMatchEffectProps) => {
  const setAnyFieldFilterRelatedRecordFilters = useSetAtomComponentState(
    anyFieldFilterRelatedRecordFiltersComponentState,
  );

  const isSearching = isNonEmptyString(filterValue);

  const { records, loading } = useFindManyRecords({
    objectNameSingular: targetObjectNameSingular,
    filter: { [targetLabelFieldName]: { ilike: `%${filterValue}%` } },
    limit: RELATED_RECORDS_LIMIT,
    recordGqlFields: { id: true },
    skip: !isSearching,
  });

  useEffect(() => {
    if (loading) {
      return;
    }

    const recordIds = records.map((record) => record.id);

    setAnyFieldFilterRelatedRecordFilters((previous) => {
      const { [relationFieldName]: _replaced, ...others } = previous;

      return isSearching && recordIds.length > 0
        ? {
            ...others,
            [relationFieldName]: {
              filterValue,
              filter: {
                [getForeignKeyNameFromRelationFieldName(relationFieldName)]: {
                  in: recordIds,
                },
              },
            },
          }
        : others;
    });
  }, [
    records,
    loading,
    isSearching,
    filterValue,
    relationFieldName,
    setAnyFieldFilterRelatedRecordFilters,
  ]);

  return null;
};

// Lets the list search match records through a many-to-one relation by the related record's name, such as people by
// their company. Only relations whose target is named by a text field take part.
export const ViewBarAnyFieldRelationSearch = () => {
  const { objectMetadataItem } = useRecordIndexContextOrThrow();
  const { objectMetadataItems } = useObjectMetadataItems();

  const anyFieldFilterValue = useAtomComponentStateValue(
    anyFieldFilterValueComponentState,
  );

  const searchableRelations = objectMetadataItem.readableFields.flatMap(
    (field: FieldMetadataItem) => {
      if (!isManyToOneRelationField(field) || !isDefined(field.relation)) {
        return [];
      }

      const targetObjectMetadataItem = objectMetadataItems.find(
        (item) => item.id === field.relation?.targetObjectMetadata.id,
      );

      const targetLabelField = targetObjectMetadataItem?.fields.find(
        (targetField) =>
          targetField.id ===
          targetObjectMetadataItem.labelIdentifierFieldMetadataId,
      );

      if (
        !isDefined(targetObjectMetadataItem) ||
        targetLabelField?.type !== FieldMetadataType.TEXT
      ) {
        return [];
      }

      return [
        {
          relationFieldName: field.name,
          targetObjectNameSingular: targetObjectMetadataItem.nameSingular,
          targetLabelFieldName: targetLabelField.name,
        },
      ];
    },
  );

  return (
    <>
      {searchableRelations.map((relation) => (
        <ViewBarAnyFieldRelationMatchEffect
          key={relation.relationFieldName}
          relationFieldName={relation.relationFieldName}
          targetObjectNameSingular={relation.targetObjectNameSingular}
          targetLabelFieldName={relation.targetLabelFieldName}
          filterValue={anyFieldFilterValue}
        />
      ))}
    </>
  );
};
