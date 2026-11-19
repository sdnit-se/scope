import { Field, ObjectType } from '@nestjs/graphql';

import { AvailableWorkspacesDTO } from 'src/engine/core-modules/workspace/dtos/available-workspace.dto';

import { AuthTokenPair } from './auth-token-pair.dto';

@ObjectType('AvailableWorkspacesAndAccessTokens')
export class AvailableWorkspacesAndAccessTokensDTO {
  @Field(() => AuthTokenPair)
  tokens: AuthTokenPair;

  @Field(() => AvailableWorkspacesDTO)
  availableWorkspaces: AvailableWorkspacesDTO;
}
