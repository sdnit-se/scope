import { useLazyFindOneRecord } from '@/object-record/hooks/useLazyFindOneRecord';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { useStore } from 'jotai';
import { CoreObjectNameSingular } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';

// A contact picked in a form may only be known from search results, which do not carry its company.
export const usePointOfContactLookup = () => {
  const store = useStore();
  const { findOneRecord: findPerson } = useLazyFindOneRecord({
    objectNameSingular: CoreObjectNameSingular.Person,
    recordGqlFields: { id: true, companyId: true },
  });

  const lookUpPointOfContact = async (
    personId: string,
  ): Promise<ObjectRecord | undefined> => {
    const stored = store.get(recordStoreFamilyState.atomFamily(personId));

    if (isDefined(stored) && isDefined(stored.companyId)) {
      return stored;
    }

    let person: ObjectRecord | undefined;

    await findPerson({
      objectRecordId: personId,
      onCompleted: (record) => {
        person = record;
      },
    }).catch(() => undefined);

    return person;
  };

  return { lookUpPointOfContact };
};
