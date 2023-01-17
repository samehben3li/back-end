import { gql } from 'apollo-server';

const authTypes = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    isAdmin: Boolean!
  }
  type Auth {
    user: User!
    accessToken: ID!
  }
  type Mutation {
    login(email: String!, password: String!): Auth!
  }
`;

export default authTypes;
