import { FieldMetadataType } from 'twenty-shared/types';

import { isEventOutsideQueryFilter } from 'src/engine/subscriptions/object-record-event/utils/is-event-outside-query-filter.util';

const fieldsByKey = new Map([
  ['name', { type: FieldMetadataType.TEXT, options: null }],
  ['employees', { type: FieldMetadataType.NUMBER, options: null }],
  ['accountOwnerId', { type: FieldMetadataType.UUID, options: null }],
  ['address', { type: FieldMetadataType.ADDRESS, options: null }],
]);

const record = {
  id: 'record-1',
  name: 'Acme',
  employees: 12,
  accountOwnerId: 'owner-1',
  address: { addressCity: 'Lund' },
  deletedAt: null,
};

describe('isEventOutsideQueryFilter', () => {
  it.each([
    ['no filter', undefined, false],
    ['an empty filter', {}, false],
    ['a matching text filter', { name: { eq: 'Acme' } }, false],
    ['a text filter that misses', { name: { eq: 'Other' } }, true],
    ['a join column filter', { accountOwnerId: { eq: 'owner-2' } }, true],
    ['a composite filter', { address: { addressCity: { eq: 'Lund' } } }, false],
    [
      'a composite filter that misses',
      { address: { addressCity: { eq: 'Paris' } } },
      true,
    ],
    [
      'an and with one miss',
      { and: [{ name: { eq: 'Acme' } }, { employees: { gt: 20 } }] },
      true,
    ],
    [
      'an or with one match',
      { or: [{ name: { eq: 'Other' } }, { employees: { lt: 20 } }] },
      false,
    ],
    ['a not around a miss', { not: { name: { eq: 'Other' } } }, false],
    ['a not around a match', { not: { name: { eq: 'Acme' } } }, true],
    [
      'a filter through a relation',
      { accountOwner: { name: { eq: 'Ada' } } },
      false,
    ],
    [
      'a not around an unknown',
      { not: { accountOwner: { name: { eq: 'Ada' } } } },
      false,
    ],
    ['a filter on a field the event lacks', { city: { eq: 'Lund' } }, false],
  ])('with %s, says outside: %s', (_, filter, isOutside) => {
    expect(
      isEventOutsideQueryFilter({
        properties: { after: record },
        filter: filter as never,
        fieldsByKey,
      }),
    ).toBe(isOutside);
  });

  it('keeps a change whose earlier state matched', () => {
    expect(
      isEventOutsideQueryFilter({
        properties: { before: record, after: { ...record, name: 'Other' } },
        filter: { name: { eq: 'Acme' } },
        fieldsByKey,
      }),
    ).toBe(false);
  });

  it('leaves soft-deleted records out unless the filter asks about deletedAt', () => {
    const deleted = { ...record, deletedAt: '2026-01-01T00:00:00.000Z' };

    expect(
      isEventOutsideQueryFilter({
        properties: { after: deleted },
        filter: {},
        fieldsByKey,
      }),
    ).toBe(true);
    expect(
      isEventOutsideQueryFilter({
        properties: { after: deleted },
        filter: { deletedAt: { is: 'NOT_NULL' } },
        fieldsByKey,
      }),
    ).toBe(false);
  });
});
