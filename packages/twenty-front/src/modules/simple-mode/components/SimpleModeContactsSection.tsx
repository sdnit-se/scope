import { useState } from 'react';
import { CoreObjectNameSingular } from 'twenty-shared/types';
import { Button } from 'twenty-ui/primitives/input';

import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { SimpleModeInlineForm } from '@/simple-mode/components/SimpleModeInlineForm';
import {
  StyledSimpleModeEmpty,
  SimpleModeRecordRow,
  StyledSimpleModeRowList,
} from '@/simple-mode/components/SimpleModeRows';
import { SimpleModeSection } from '@/simple-mode/components/SimpleModeSection';
import { useSimpleModeCreationDefaults } from '@/simple-mode/hooks/useSimpleModeCreationDefaults';
import { SIMPLE_MODE_LABELS } from '@/simple-mode/constants/SimpleModeLabels';

type Person = ObjectRecord & {
  name: { firstName: string; lastName: string } | null;
  jobTitle: string | null;
  emails: { primaryEmail: string | null } | null;
};

type SimpleModeContactsSectionProps = {
  companyId: string;
};

export const SimpleModeContactsSection = ({
  companyId,
}: SimpleModeContactsSectionProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { records, loading, refetch, hasNextPage, fetchMoreRecords } =
    useFindManyRecords<Person>({
      objectNameSingular: CoreObjectNameSingular.Person,
      filter: { companyId: { eq: companyId } },
      orderBy: [{ name: { firstName: 'AscNullsLast' } }],
      recordGqlFields: { id: true, name: true, jobTitle: true, emails: true },
      limit: 60,
    });

  const { createOneRecord } = useCreateOneRecord({
    objectNameSingular: CoreObjectNameSingular.Person,
  });
  const withDefaults = useSimpleModeCreationDefaults(
    CoreObjectNameSingular.Person,
  );

  const handleCreate = async (values: Record<string, string>) => {
    await createOneRecord(
      withDefaults({
        name: {
          firstName: values.firstName ?? '',
          lastName: values.lastName ?? '',
        },
        jobTitle: values.jobTitle ?? '',
        emails: { primaryEmail: values.email ?? '', additionalEmails: null },
        phones: {
          primaryPhoneNumber: values.phone ?? '',
          primaryPhoneCountryCode: '',
          primaryPhoneCallingCode: '',
          additionalPhones: null,
        },
        companyId,
      }),
    );
    setIsFormOpen(false);
    void refetch();
  };

  return (
    <SimpleModeSection
      title={SIMPLE_MODE_LABELS.contacts}
      action={
        !isFormOpen && (
          <Button
            size="md"
            variant="outline"
            onClick={() => setIsFormOpen(true)}
          >
            {SIMPLE_MODE_LABELS.newContact}
          </Button>
        )
      }
    >
      {isFormOpen && (
        <SimpleModeInlineForm
          fields={[
            {
              name: 'firstName',
              label: SIMPLE_MODE_LABELS.firstName,
              isRequired: true,
            },
            { name: 'lastName', label: SIMPLE_MODE_LABELS.lastName },
            { name: 'jobTitle', label: SIMPLE_MODE_LABELS.jobTitle },
            { name: 'email', label: SIMPLE_MODE_LABELS.email, type: 'email' },
            { name: 'phone', label: SIMPLE_MODE_LABELS.phone, type: 'tel' },
          ]}
          onSubmit={handleCreate}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
      {!loading && records.length === 0 ? (
        <StyledSimpleModeEmpty>
          {SIMPLE_MODE_LABELS.noContacts}
        </StyledSimpleModeEmpty>
      ) : (
        <StyledSimpleModeRowList>
          {records.map((person) => (
            <SimpleModeRecordRow
              key={person.id}
              objectNameSingular={CoreObjectNameSingular.Person}
              recordId={person.id}
              label={`${person.name?.firstName ?? ''} ${person.name?.lastName ?? ''}`.trim()}
              detail={[person.jobTitle, person.emails?.primaryEmail]
                .filter(Boolean)
                .join(' · ')}
            />
          ))}
        </StyledSimpleModeRowList>
      )}
      {hasNextPage && (
        <Button
          size="md"
          variant="ghost"
          onClick={() => void fetchMoreRecords()}
        >
          {SIMPLE_MODE_LABELS.showMore}
        </Button>
      )}
    </SimpleModeSection>
  );
};
