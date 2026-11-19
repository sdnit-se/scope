import { MetadataReadability } from 'twenty-shared/types';

import { getFlatObjectMetadataMock } from 'src/engine/metadata-modules/flat-object-metadata/__mocks__/get-flat-object-metadata.mock';
import { type FlatObjectMetadata } from 'src/engine/metadata-modules/flat-object-metadata/types/flat-object-metadata.type';
import { type OperationType } from 'src/engine/twenty-orm/repository/permissions.utils';
import { buildRowAccessPolicy } from 'src/engine/twenty-orm/utils/build-row-access-policy.util';
import { type RowAccessSubject } from 'src/engine/twenty-orm/types/row-access-policy.type';

const APPLICATION_ID = 'application-id';

const buildObject = (
  overrides: Partial<FlatObjectMetadata> = {},
): FlatObjectMetadata =>
  ({
    ...getFlatObjectMetadataMock({
      id: 'note',
      nameSingular: 'note',
      namePlural: 'notes',
      universalIdentifier: 'note-universal-identifier',
      applicationId: APPLICATION_ID,
      isSystem: false,
    } as Parameters<typeof getFlatObjectMetadataMock>[0]),
    ...overrides,
  }) as FlatObjectMetadata;

const FULL_ACCESS = {
  canReadObjectRecords: true,
  canUpdateObjectRecords: true,
  canSoftDeleteObjectRecords: true,
  canDestroyObjectRecords: true,
  restrictedFields: {},
};

const buildSubject = (
  overrides: Partial<RowAccessSubject> = {},
): RowAccessSubject => ({
  isSystemContext: false,
  objectsPermissions: { note: FULL_ACCESS },
  isOwningApplication: () => false,
  ...overrides,
});

const kindFor = ({
  subject = buildSubject(),
  flatObjectMetadata = buildObject(),
  operationType = 'select',
}: {
  subject?: RowAccessSubject;
  flatObjectMetadata?: FlatObjectMetadata;
  operationType?: OperationType;
} = {}) =>
  buildRowAccessPolicy({ subject, flatObjectMetadata, operationType }).kind;

describe('buildRowAccessPolicy', () => {
  it('opens every record of an object the role may read', () => {
    expect(kindFor()).toBe('open');
  });

  it('denies an object the role may not read', () => {
    expect(
      kindFor({
        subject: buildSubject({
          objectsPermissions: {
            note: { ...FULL_ACCESS, canReadObjectRecords: false },
          },
        }),
      }),
    ).toBe('denied');
  });

  it('decides each operation by its own permission', () => {
    const subject = buildSubject({
      objectsPermissions: {
        note: {
          ...FULL_ACCESS,
          canUpdateObjectRecords: false,
          canDestroyObjectRecords: false,
        },
      },
    });

    expect(kindFor({ subject, operationType: 'select' })).toBe('open');
    expect(kindFor({ subject, operationType: 'soft-delete' })).toBe('open');
    expect(kindFor({ subject, operationType: 'update' })).toBe('denied');
    expect(kindFor({ subject, operationType: 'delete' })).toBe('denied');
  });

  it('opens private and inherited objects like any other', () => {
    for (const readability of [
      MetadataReadability.PRIVATE,
      MetadataReadability.INHERITED,
    ]) {
      expect(
        kindFor({ flatObjectMetadata: buildObject({ readability }) }),
      ).toBe('open');
    }
  });

  it('denies an operation the object switches off', () => {
    expect(
      kindFor({
        flatObjectMetadata: buildObject({
          disabledObjectPermissionActions: ['canReadObjectRecords'],
        }),
      }),
    ).toBe('denied');
  });

  it('lets the owning application use an operation the object switches off', () => {
    expect(
      kindFor({
        subject: buildSubject({ isOwningApplication: () => true }),
        flatObjectMetadata: buildObject({
          disabledObjectPermissionActions: ['canReadObjectRecords'],
        }),
      }),
    ).toBe('open');
  });

  it('lets the system do anything', () => {
    expect(
      kindFor({
        subject: buildSubject({
          isSystemContext: true,
          objectsPermissions: {},
        }),
        flatObjectMetadata: buildObject({
          disabledObjectPermissionActions: ['canDestroyObjectRecords'],
        }),
        operationType: 'delete',
      }),
    ).toBe('open');
  });
});
