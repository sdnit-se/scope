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

type Opportunity = ObjectRecord & {
  name: string | null;
  closeDate: string | null;
  owner: { name: { firstName: string; lastName: string } | null } | null;
};

type SimpleModeDealsSectionProps = {
  companyId: string;
};

export const SimpleModeDealsSection = ({
  companyId,
}: SimpleModeDealsSectionProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { records, loading, refetch, hasNextPage, fetchMoreRecords } =
    useFindManyRecords<Opportunity>({
      objectNameSingular: CoreObjectNameSingular.Opportunity,
      filter: { companyId: { eq: companyId } },
      orderBy: [{ createdAt: 'DescNullsLast' }],
      recordGqlFields: { id: true, name: true, closeDate: true, owner: true },
      limit: 60,
    });

  const { createOneRecord } = useCreateOneRecord({
    objectNameSingular: CoreObjectNameSingular.Opportunity,
  });
  const withDefaults = useSimpleModeCreationDefaults(
    CoreObjectNameSingular.Opportunity,
  );

  const handleCreate = async (values: Record<string, string>) => {
    await createOneRecord(withDefaults({ name: values.name ?? '', companyId }));
    setIsFormOpen(false);
    void refetch();
  };

  return (
    <SimpleModeSection
      title={SIMPLE_MODE_LABELS.deals}
      action={
        !isFormOpen && (
          <Button
            size="md"
            variant="outline"
            onClick={() => setIsFormOpen(true)}
          >
            {SIMPLE_MODE_LABELS.newDeal}
          </Button>
        )
      }
    >
      {isFormOpen && (
        <SimpleModeInlineForm
          fields={[
            {
              name: 'name',
              label: SIMPLE_MODE_LABELS.dealName,
              isRequired: true,
            },
          ]}
          onSubmit={handleCreate}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
      {!loading && records.length === 0 ? (
        <StyledSimpleModeEmpty>
          {SIMPLE_MODE_LABELS.noDeals}
        </StyledSimpleModeEmpty>
      ) : (
        <StyledSimpleModeRowList>
          {records.map((opportunity) => (
            <SimpleModeRecordRow
              key={opportunity.id}
              objectNameSingular={CoreObjectNameSingular.Opportunity}
              recordId={opportunity.id}
              label={opportunity.name ?? ''}
              detail={
                opportunity.owner?.name
                  ? `${opportunity.owner.name.firstName} ${opportunity.owner.name.lastName}`.trim()
                  : undefined
              }
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
