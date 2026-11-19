import { randomUUID } from 'node:crypto';

import { getAppProviderByClassName } from 'test/integration/utils/get-app-provider-by-class-name.util';
import { getCoreRepository } from 'test/integration/utils/get-core-repository.util';
import { EVERYONE_PRINCIPAL_ID } from 'twenty-shared/constants';
import { STANDARD_OBJECTS } from 'twenty-shared/metadata';
import {
  type FieldMetadataComplexOption,
  RecordShareAccessLevel,
  RecordSharePrincipalType,
  RecordShareRowCause,
} from 'twenty-shared/types';

import { type AddRecordShareNoneAccessLevelCommand } from 'src/database/commands/upgrade-version-command/2-45/2-45-workspace-command-1790876639146-add-record-share-none-access-level.command';
import { type UpgradeCommandRegistryService } from 'src/engine/core-modules/upgrade/services/upgrade-command-registry.service';
import { FieldMetadataEntity } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { type WorkspaceMigrationValidateBuildAndRunService } from 'src/engine/workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service';
import { buildSystemAuthContext } from 'src/engine/twenty-orm/utils/build-system-auth-context.util';
import { type WorkspaceOrmManager } from 'src/engine/twenty-orm/workspace-orm.manager';
import { SEED_APPLE_WORKSPACE_ID } from 'src/engine/workspace-manager/dev-seeder/core/constants/seeder-workspaces.constant';
import { getWorkspaceSchemaName } from 'src/engine/workspace-datasource/utils/get-workspace-schema-name.util';

const workspaceId = SEED_APPLE_WORKSPACE_ID;
const authContext = buildSystemAuthContext(workspaceId);
const RECORD_ID = randomUUID();
const OBJECT_METADATA_ID = randomUUID();
const RECORD_SHARE_TABLE = `"${getWorkspaceSchemaName(workspaceId)}"."recordShare"`;

describe('2-45 workspace command 1790876639146 - AddRecordShareNoneAccessLevelCommand (integration)', () => {
  let command: AddRecordShareNoneAccessLevelCommand;
  let workspaceOrmManager: WorkspaceOrmManager;

  const run = (
    direction: 'up' | 'down',
    { dryRun = false }: { dryRun?: boolean } = {},
  ) =>
    workspaceOrmManager.executeInWorkspaceContext(
      () =>
        command[direction]({
          workspaceId,
          options: { dryRun },
          index: 0,
          total: 1,
        }),
      authContext,
    );

  const findAccessLevelValues = async () => {
    const { options } = await getCoreRepository<FieldMetadataEntity>(
      FieldMetadataEntity,
    ).findOneOrFail({
      where: {
        universalIdentifier:
          STANDARD_OBJECTS.recordShare.fields.accessLevel.universalIdentifier,
        workspaceId,
      },
    });

    return ((options ?? []) as FieldMetadataComplexOption[]).map(
      ({ value }) => value,
    );
  };

  const insertRestriction = () =>
    global.testDataSource.query(
      `INSERT INTO ${RECORD_SHARE_TABLE} ("objectMetadataId", "recordId", "principalId", "principalType", "accessLevel", "rowCause", "sourceId")
       VALUES ($1, $2, $3, $4, $5, $6, $2)`,
      [
        OBJECT_METADATA_ID,
        RECORD_ID,
        EVERYONE_PRINCIPAL_ID,
        RecordSharePrincipalType.EVERYONE,
        RecordShareAccessLevel.NONE,
        RecordShareRowCause.MANUAL,
      ],
    );

  const findRestrictions = (): Promise<{ accessLevel: string }[]> =>
    global.testDataSource.query(
      `SELECT "accessLevel" FROM ${RECORD_SHARE_TABLE} WHERE "objectMetadataId" = $1 AND "recordId" = $2 AND "deletedAt" IS NULL`,
      [OBJECT_METADATA_ID, RECORD_ID],
    );

  const deleteRestrictions = () =>
    global.testDataSource.query(
      `DELETE FROM ${RECORD_SHARE_TABLE} WHERE "objectMetadataId" = $1 AND "recordId" = $2`,
      [OBJECT_METADATA_ID, RECORD_ID],
    );

  beforeAll(() => {
    command = getAppProviderByClassName<AddRecordShareNoneAccessLevelCommand>(
      'AddRecordShareNoneAccessLevelCommand',
    );
    workspaceOrmManager = getAppProviderByClassName<WorkspaceOrmManager>(
      'WorkspaceOrmManager',
    );
  });

  afterAll(async () => {
    await run('up');
    await deleteRestrictions();
  });

  it('is registered in the 2.45 bundle', () => {
    const registry = getAppProviderByClassName<UpgradeCommandRegistryService>(
      'UpgradeCommandRegistryService',
    );

    expect(registry.getBundleForVersion('2.45.0').workspaceCommands).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ command, timestamp: 1790876639146 }),
      ]),
    );
  });

  it('removes restrictions and the option on the way down', async () => {
    await run('up');
    await insertRestriction();

    await run('down');

    expect(await findAccessLevelValues()).not.toContain(
      RecordShareAccessLevel.NONE,
    );
    expect(await findRestrictions()).toEqual([]);
    await expect(insertRestriction()).rejects.toThrow();
  });

  it('keeps a workspace without the option untouched on a dry run', async () => {
    await run('down');
    await run('up', { dryRun: true });

    expect(await findAccessLevelValues()).not.toContain(
      RecordShareAccessLevel.NONE,
    );
  });

  it('adds the option so restrictions can be stored, once', async () => {
    await run('down');
    await run('up');
    await run('up');

    const values = await findAccessLevelValues();

    expect(
      values.filter((value) => value === RecordShareAccessLevel.NONE),
    ).toHaveLength(1);
    await insertRestriction();
    expect(await findRestrictions()).toEqual([
      expect.objectContaining({ accessLevel: RecordShareAccessLevel.NONE }),
    ]);
  });

  it('puts restrictions back when the downgrade fails', async () => {
    await run('up');
    await deleteRestrictions();
    await insertRestriction();

    const migrationSpy = jest
      .spyOn(
        getAppProviderByClassName<WorkspaceMigrationValidateBuildAndRunService>(
          'WorkspaceMigrationValidateBuildAndRunService',
        ),
        'validateBuildAndRunLegacyWorkspaceMigration',
      )
      .mockRejectedValueOnce(new Error('Migration failed'));

    try {
      await expect(run('down')).rejects.toThrow('Migration failed');
    } finally {
      migrationSpy.mockRestore();
    }

    expect(await findAccessLevelValues()).toContain(
      RecordShareAccessLevel.NONE,
    );
    expect(await findRestrictions()).toEqual([
      expect.objectContaining({ accessLevel: RecordShareAccessLevel.NONE }),
    ]);
  });
});
