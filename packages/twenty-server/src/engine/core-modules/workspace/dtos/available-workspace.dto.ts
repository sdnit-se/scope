import { Field, ObjectType } from '@nestjs/graphql';

import { UUIDScalarType } from 'src/engine/api/graphql/workspace-schema-builder/graphql-types/scalars';
import { WorkspaceUrlsDTO } from 'src/engine/core-modules/workspace/dtos/workspace-urls.dto';

@ObjectType('AvailableWorkspace')
export class AvailableWorkspaceDTO {
  @Field(() => UUIDScalarType)
  id: string;

  @Field(() => String, { nullable: true })
  displayName?: string;

  @Field(() => String, { nullable: true })
  logo?: string;

  @Field(() => WorkspaceUrlsDTO)
  workspaceUrls: WorkspaceUrlsDTO;

  @Field(() => String, { nullable: true })
  loginToken?: string;

  @Field(() => String, { nullable: true })
  personalInviteToken?: string;

  @Field(() => String, { nullable: true })
  inviteHash?: string;
}

@ObjectType('AvailableWorkspaces')
export class AvailableWorkspacesDTO {
  @Field(() => [AvailableWorkspaceDTO])
  availableWorkspacesForSignIn: AvailableWorkspaceDTO[];

  @Field(() => [AvailableWorkspaceDTO])
  availableWorkspacesForSignUp: AvailableWorkspaceDTO[];
}
