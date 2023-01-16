import { gql } from 'apollo-server';

const userTypes = gql`
  type Query {
    getUsers: [User]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!

    updateUser(
      id: ID!
      username: String
      email: String
      password: String
    ): User!

    deleteUser(id: ID!): String!
  }
`;

export default userTypes;
