import { type FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { FieldMetadataType } from 'twenty-shared/types';
import {
  computeRelationGqlFieldJoinColumnName,
  isDefined,
} from 'twenty-shared/utils';

// Who a new record belongs to when someone creates it themselves.
const MEMBER_FIELDS_DEFAULTING_TO_ME = ['owner', 'accountOwner', 'assignee'];

// Shebang's normal case: a deal is a Consulting deal and starts at the first sales stage.
const SELECT_FIELDS_DEFAULTING_TO_FIRST_OPTION: Record<string, string[]> = {
  opportunity: ['engagementType', 'salesStage'],
};

const isEmpty = (value: unknown) =>
  !isDefined(value) ||
  value === '' ||
  (Array.isArray(value) && value.length === 0);

type ComputeRecordCreationDefaultsArgs = {
  objectNameSingular: string;
  fields: Pick<FieldMetadataItem, 'name' | 'type' | 'options' | 'relation'>[];
  draftRecord: Partial<ObjectRecord>;
  currentWorkspaceMemberId?: string;
  getRecord: (recordId: string) => ObjectRecord | null | undefined;
};

// Fills what the CRM already knows into a record a person is creating in the interface; a value already in the draft
// always wins. Imports and integrations create records through the API and never come here.
export const computeRecordCreationDefaults = ({
  objectNameSingular,
  fields,
  draftRecord,
  currentWorkspaceMemberId,
  getRecord,
}: ComputeRecordCreationDefaultsArgs): Partial<ObjectRecord> => {
  const defaults: Partial<ObjectRecord> = {};
  const fieldByName = new Map(fields.map((field) => [field.name, field]));

  for (const name of MEMBER_FIELDS_DEFAULTING_TO_ME) {
    const field = fieldByName.get(name);
    const joinColumnName = computeRelationGqlFieldJoinColumnName({ name });

    if (
      isDefined(field) &&
      field.type === FieldMetadataType.RELATION &&
      field.relation?.targetObjectMetadata.nameSingular === 'workspaceMember' &&
      isDefined(currentWorkspaceMemberId) &&
      isEmpty(draftRecord[joinColumnName])
    ) {
      defaults[joinColumnName] = currentWorkspaceMemberId;
    }
  }

  for (const name of SELECT_FIELDS_DEFAULTING_TO_FIRST_OPTION[
    objectNameSingular
  ] ?? []) {
    const field = fieldByName.get(name);
    const firstOption = field?.options?.toSorted(
      (left, right) => left.position - right.position,
    )[0];

    if (
      field?.type === FieldMetadataType.SELECT &&
      isDefined(firstOption) &&
      isEmpty(draftRecord[name])
    ) {
      defaults[name] = firstOption.value;
    }
  }

  // A deal made for a contact belongs to the contact's company.
  const pointOfContactId = draftRecord.pointOfContactId;

  if (
    objectNameSingular === 'opportunity' &&
    fieldByName.has('company') &&
    isDefined(pointOfContactId) &&
    isEmpty(draftRecord.companyId)
  ) {
    const companyId = getRecord(pointOfContactId)?.companyId;

    if (isDefined(companyId)) {
      defaults.companyId = companyId;
    }
  }

  return defaults;
};
