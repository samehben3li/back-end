import { gql } from 'apollo-server-express';
import { authTypes, authMutation } from './auth';
import { flagTypes, flagQuery, flagMutation } from './flag';
import { userTypes, userQuery, userMutation } from './user';
import { inputTypes, inputQuery, inputMutation } from './input';

export const typeDefs = gql`
  type Query
  type Mutation
  ${authTypes}
  ${flagTypes}
  ${userTypes}
  ${inputTypes}
`;

export const resolvers = {
  Query: {
    ...flagQuery,
    ...userQuery,
    ...inputQuery,
  },
  Mutation: {
    ...flagMutation,
    ...authMutation,
    ...userMutation,
    ...inputMutation,
  },
};
