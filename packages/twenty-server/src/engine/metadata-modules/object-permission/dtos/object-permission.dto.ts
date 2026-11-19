import { Field, ObjectType } from '@nestjs/graphql';

import GraphQLJSON from 'graphql-type-json';
import { RestrictedFieldsPermissions } from 'twenty-shared/types';

import { UUIDScalarType } from 'src/engine/api/graphql/workspace-schema-builder/graphql-types/scalars';

@ObjectType('ObjectPermission')
export class ObjectPermissionDTO {
  @Field(() => UUIDScalarType, { nullable: false })
  objectMetadataId: string;

  @Field(() => Boolean, { nullable: true })
  canReadObjectRecords?: boolean | null;

  @Field(() => Boolean, { nullable: true })
  canUpdateObjectRecords?: boolean | null;

  @Field(() => Boolean, { nullable: true })
  canSoftDeleteObjectRecords?: boolean | null;

  @Field(() => Boolean, { nullable: true })
  canDestroyObjectRecords?: boolean | null;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  restrictedFields?: RestrictedFieldsPermissions;
}
