import { useObjectMetadataItems } from '@/object-metadata/hooks/useObjectMetadataItems';
import { RecordDetailMorphRelationSectionDropdown } from '@/object-record/record-field-list/record-detail-section/relation/components/RecordDetailMorphRelationSectionDropdown';
import { RecordDetailRelationSectionDropdown } from '@/object-record/record-field-list/record-detail-section/relation/components/RecordDetailRelationSectionDropdown';
import {
  FieldContext,
  type GenericFieldContextType,
} from '@/object-record/record-field/ui/contexts/FieldContext';
import {
  FieldInputEventContext,
  type FieldInputEvent,
} from '@/object-record/record-field/ui/contexts/FieldInputEventContext';
import { usePersistField } from '@/object-record/record-field/ui/hooks/usePersistField';
import { type FieldDefinition } from '@/object-record/record-field/ui/types/FieldDefinition';
import {
  type FieldMorphRelationMetadata,
  type FieldRelationMetadata,
} from '@/object-record/record-field/ui/types/FieldMetadata';
import { isFieldMorphRelation } from '@/object-record/record-field/ui/types/guards/isFieldMorphRelation';
import { recordStoreFamilySelector } from '@/object-record/record-store/states/selectors/recordStoreFamilySelector';
import { useAtomFamilySelectorValue } from '@/ui/utilities/state/jotai/hooks/useAtomFamilySelectorValue';
import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { CustomError, isDefined } from 'twenty-shared/utils';
import { doNotTranslate } from 'twenty-shared/i18n';
import { IconPencil, IconPlus } from 'twenty-ui/icon';
import { IconButton } from 'twenty-ui/components/input';
import { Button } from 'twenty-ui/primitives/input';
import { RelationType } from '~/generated-metadata/graphql';

type FieldWidgetRelationEditActionProps = {
  fieldDefinition:
    | FieldDefinition<FieldRelationMetadata>
    | FieldDefinition<FieldMorphRelationMetadata>;
  recordId: string;
};

const StyledEditButtonWrapper = styled.div`
  opacity: 1;
  pointer-events: auto;
`;

export const FieldWidgetRelationEditAction = ({
  fieldDefinition,
  recordId,
}: FieldWidgetRelationEditActionProps) => {
  const { objectMetadataItems } = useObjectMetadataItems();
  const objectMetadataItem = objectMetadataItems.find(
    (item) =>
      item.nameSingular === fieldDefinition.metadata.objectMetadataNameSingular,
  );

  if (!objectMetadataItem) {
    throw new CustomError(
      doNotTranslate('Object metadata item not found'),
      'OBJECT_METADATA_ITEM_NOT_FOUND',
    );
  }

  const persistField = usePersistField({
    objectMetadataItemId: objectMetadataItem.id,
  });

  const handleSubmit: FieldInputEvent = ({ newValue }) => {
    persistField({
      recordId,
      fieldDefinition,
      valueToPersist: newValue,
    });
  };

  const fieldContextValue = {
    recordId,
    fieldDefinition,
    isLabelIdentifier: false,
    isRecordFieldReadOnly: false,
  } satisfies GenericFieldContextType;

  const isMorphRelation = isFieldMorphRelation(fieldDefinition);

  const relationValue = useAtomFamilySelectorValue(recordStoreFamilySelector, {
    recordId,
    fieldName: fieldDefinition.metadata.fieldName,
  });

  const hasAtLeastOneRelationRecord = Array.isArray(relationValue)
    ? relationValue.length > 0
    : isDefined(relationValue);

  // A list such as People or Opportunities grows by adding to it, so it shows a worded plus; a pencil is kept for
  // changing a single related record.
  const isManyToOne =
    fieldDefinition.metadata.relationType === RelationType.MANY_TO_ONE;

  // A morph relation's records sit under per-target field names, so its emptiness is not known here.
  const isEditAction = isMorphRelation
    ? isManyToOne || hasAtLeastOneRelationRecord
    : isManyToOne && hasAtLeastOneRelationRecord;

  const dropdownTriggerClickableComponent = isEditAction ? (
    <IconButton variant="ghost" size="sm" aria-label={t`Edit relation`}>
      <IconPencil />
    </IconButton>
  ) : (
    <Button
      variant="ghost"
      size="sm"
      startIcon={<IconPlus />}
      aria-label={t`Add relation`}
    >
      {t`Add`}
    </Button>
  );

  return (
    <StyledEditButtonWrapper>
      <FieldContext.Provider value={fieldContextValue}>
        <FieldInputEventContext.Provider value={{ onSubmit: handleSubmit }}>
          {isMorphRelation ? (
            <RecordDetailMorphRelationSectionDropdown
              loading={false}
              dropdownTriggerClickableComponent={
                dropdownTriggerClickableComponent
              }
            />
          ) : (
            <RecordDetailRelationSectionDropdown
              loading={false}
              dropdownTriggerClickableComponent={
                dropdownTriggerClickableComponent
              }
            />
          )}
        </FieldInputEventContext.Provider>
      </FieldContext.Provider>
    </StyledEditButtonWrapper>
  );
};
