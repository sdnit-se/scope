import { styled } from '@linaria/react';
import { isString } from '@sniptt/guards';
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AppPath, CoreObjectNameSingular } from 'twenty-shared/types';
import { getAppPath, isDefined } from 'twenty-shared/utils';
import { Button } from 'twenty-ui/primitives/input';
import { themeCssVariables } from 'twenty-ui/theme';

import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { useFindOneRecord } from '@/object-record/hooks/useFindOneRecord';
import { type FieldMultiSelectValue } from '@/object-record/record-field/ui/types/FieldMetadata';
import { RecordShowContainerContextStoreTargetedRecordsEffect } from '@/object-record/record-show/components/RecordShowContainerContextStoreTargetedRecordsEffect';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { SimpleModeContactsSection } from '@/simple-mode/components/SimpleModeContactsSection';
import { SimpleModeDealsSection } from '@/simple-mode/components/SimpleModeDealsSection';
import { SimpleModeNotesSection } from '@/simple-mode/components/SimpleModeNotesSection';
import { SimpleModeTasksSection } from '@/simple-mode/components/SimpleModeTasksSection';
import { SIMPLE_MODE_LABELS } from '@/simple-mode/constants/SimpleModeLabels';
import { MultiSelectDisplay } from '@/ui/field/display/components/MultiSelectDisplay';
import { FieldMetadataType } from '~/generated-metadata/graphql';

const StyledScrollArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  width: 100%;
`;

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[8]};
  margin: 0 auto;
  max-width: 880px;
  padding: ${themeCssVariables.spacing[6]} ${themeCssVariables.spacing[4]};
  width: 100%;
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledName = styled.h1`
  color: ${themeCssVariables.font.color.primary};
  font-size: 1.8rem;
  font-weight: ${themeCssVariables.font.weight.semiBold};
  margin: 0;
`;

const StyledDetails = styled.div`
  color: ${themeCssVariables.font.color.secondary};
  display: flex;
  flex-wrap: wrap;
  font-size: ${themeCssVariables.font.size.lg};
  gap: ${themeCssVariables.spacing[3]};
`;

const StyledDetailLink = styled(Link)`
  color: ${themeCssVariables.font.color.secondary};
`;

const StyledTagRow = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledTagLabel = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  flex-shrink: 0;
`;

// Shebang's tag fields that belong next to the name, so a seller sees them without opening "Mer".
const TAG_FIELD_NAMES: Record<string, string[]> = {
  [CoreObjectNameSingular.Company]: ['ongoingDiscussions', 'interestAreas'],
  [CoreObjectNameSingular.Person]: ['interestAreas'],
};

const StyledMore = styled.div`
  border-top: 1px solid ${themeCssVariables.border.color.medium};
  padding-top: ${themeCssVariables.spacing[4]};
`;

type Name = { firstName: string; lastName: string } | null;

type SimpleModeRecord = ObjectRecord & {
  name: string | Name;
  domainName?: { primaryLinkUrl: string | null } | null;
  accountOwner?: { name: Name } | null;
  company?: { id: string; name: string } | null;
  jobTitle?: string | null;
  emails?: { primaryEmail: string | null } | null;
  phones?: {
    primaryPhoneNumber: string | null;
    primaryPhoneCallingCode: string | null;
  } | null;
};

const fullName = (name: Name | undefined) =>
  isDefined(name) ? `${name.firstName} ${name.lastName}`.trim() : '';

type SimpleModeRecordPageProps = {
  objectNameSingular: string;
  recordId: string;
  isStandardPageShown: boolean;
  onToggleStandardPage: () => void;
  standardPage: ReactNode;
};

// What a seller needs when opening a customer or a contact: who it is, its notes, its people, its deals and tasks.
// Everything else stays on Twenty's own page, one "Mer" away.
export const SimpleModeRecordPage = ({
  objectNameSingular,
  recordId,
  isStandardPageShown,
  onToggleStandardPage,
  standardPage,
}: SimpleModeRecordPageProps) => {
  const isCompany = objectNameSingular === CoreObjectNameSingular.Company;

  const { objectMetadataItem } = useObjectMetadataItem({ objectNameSingular });
  const tagFields = objectMetadataItem.fields.filter(
    (field) =>
      field.type === FieldMetadataType.MULTI_SELECT &&
      (TAG_FIELD_NAMES[objectNameSingular] ?? []).includes(field.name),
  );
  const tagGqlFields = Object.fromEntries(
    tagFields.map((field) => [field.name, true]),
  );

  const { record } = useFindOneRecord<SimpleModeRecord>({
    objectNameSingular,
    objectRecordId: recordId,
    recordGqlFields: isCompany
      ? {
          id: true,
          name: true,
          domainName: true,
          accountOwner: true,
          ...tagGqlFields,
        }
      : {
          id: true,
          name: true,
          company: true,
          jobTitle: true,
          emails: true,
          phones: true,
          ...tagGqlFields,
        },
  });

  const name = isString(record?.name) ? record.name : fullName(record?.name);

  const details = isCompany
    ? [
        record?.accountOwner
          ? `${SIMPLE_MODE_LABELS.owner}: ${fullName(record.accountOwner.name)}`
          : SIMPLE_MODE_LABELS.noOwner,
        record?.domainName?.primaryLinkUrl,
      ]
    : [
        record?.jobTitle,
        record?.emails?.primaryEmail,
        record?.phones?.primaryPhoneNumber
          ? `${record.phones.primaryPhoneCallingCode ?? ''} ${record.phones.primaryPhoneNumber}`.trim()
          : null,
      ];

  const target = {
    recordId,
    noteTargetFieldName: isCompany ? 'targetCompanyId' : 'targetPersonId',
  } as const;

  return (
    <StyledScrollArea>
      {/* Selects this record for the header actions; re-applied after "Mer" closes and the full page clears it. */}
      <RecordShowContainerContextStoreTargetedRecordsEffect
        key={String(isStandardPageShown)}
        recordId={recordId}
      />
      <StyledPage>
        <StyledHeader>
          <StyledName>{name}</StyledName>
          <StyledDetails>
            {!isCompany && isDefined(record?.company) && (
              <StyledDetailLink
                to={getAppPath(AppPath.RecordShowPage, {
                  objectNameSingular: CoreObjectNameSingular.Company,
                  objectRecordId: record.company.id,
                })}
              >
                {record.company.name}
              </StyledDetailLink>
            )}
            {details.filter(Boolean).map((detail) => (
              <span key={detail}>{detail}</span>
            ))}
          </StyledDetails>
          {tagFields.map((field) => {
            const values = record?.[field.name] as
              | FieldMultiSelectValue
              | undefined;

            return isDefined(values) && values.length > 0 ? (
              <StyledTagRow key={field.id}>
                <StyledTagLabel>{field.label}</StyledTagLabel>
                <MultiSelectDisplay
                  values={values}
                  options={field.options ?? []}
                />
              </StyledTagRow>
            ) : null;
          })}
        </StyledHeader>
        <SimpleModeNotesSection target={target} />
        {isCompany && <SimpleModeContactsSection companyId={recordId} />}
        {isCompany && <SimpleModeDealsSection companyId={recordId} />}
        <SimpleModeTasksSection target={target} />
        <StyledMore>
          <Button size="md" variant="outline" onClick={onToggleStandardPage}>
            {isStandardPageShown
              ? SIMPLE_MODE_LABELS.less
              : SIMPLE_MODE_LABELS.more}
          </Button>
        </StyledMore>
        {isStandardPageShown && standardPage}
      </StyledPage>
    </StyledScrollArea>
  );
};
