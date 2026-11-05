import { computeRecordCreationDefaults } from '@/object-record/record-form/utils/computeRecordCreationDefaults';
import { FieldMetadataType } from 'twenty-shared/types';

const memberRelation = (name: string) => ({
  name,
  type: FieldMetadataType.RELATION,
  options: null,
  relation: { targetObjectMetadata: { nameSingular: 'workspaceMember' } },
});

const select = (name: string, values: string[]) => ({
  name,
  type: FieldMetadataType.SELECT,
  options: values.map((value, position) => ({
    value,
    position,
    label: value,
    id: value,
    color: 'gray',
  })),
  relation: null,
});

const opportunityFields = [
  memberRelation('owner'),
  select('engagementType', ['CONSULTING', 'RECRUITMENT', 'OTHER']),
  select('salesStage', ['QUALIFICATION', 'MEETING_SCHEDULED']),
  {
    name: 'company',
    type: FieldMetadataType.RELATION,
    options: null,
    relation: { targetObjectMetadata: { nameSingular: 'company' } },
  },
] as never;

describe('computeRecordCreationDefaults', () => {
  it("fills owner, Consulting, the first stage and the contact's company into a new deal", () => {
    expect(
      computeRecordCreationDefaults({
        objectNameSingular: 'opportunity',
        fields: opportunityFields,
        draftRecord: { pointOfContactId: 'robert' },
        currentWorkspaceMemberId: 'stefan',
        getRecord: (id) =>
          id === 'robert' ? ({ id, companyId: 'polisen' } as never) : undefined,
      }),
    ).toEqual({
      ownerId: 'stefan',
      engagementType: 'CONSULTING',
      salesStage: 'QUALIFICATION',
      companyId: 'polisen',
    });
  });

  it('never replaces a value the person or the page already set', () => {
    expect(
      computeRecordCreationDefaults({
        objectNameSingular: 'opportunity',
        fields: opportunityFields,
        draftRecord: {
          ownerId: 'petter',
          engagementType: 'RECRUITMENT',
          salesStage: 'PROPOSAL',
          companyId: 'saab',
          pointOfContactId: 'robert',
        },
        currentWorkspaceMemberId: 'stefan',
        getRecord: () => ({ id: 'robert', companyId: 'polisen' }) as never,
      }),
    ).toEqual({});
  });

  it('makes the signed-in member the owner or assignee elsewhere, without deal defaults', () => {
    expect(
      computeRecordCreationDefaults({
        objectNameSingular: 'company',
        fields: [
          memberRelation('accountOwner'),
          select('companyType', ['A', 'B']),
        ] as never,
        draftRecord: {},
        currentWorkspaceMemberId: 'stefan',
        getRecord: () => undefined,
      }),
    ).toEqual({ accountOwnerId: 'stefan' });
  });
});
