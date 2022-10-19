import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }
  type Auth {
    user: User!
    accessToken: ID!
  }
  input LocationInput {
    left: [String]!
    right: [String]!
  }
  type Location {
    left: [String]!
    right: [String]!
  }
  type InputOption {
    name: String!
    imgUrl: String
  }
  input InputOptionInput {
    name: String!
    imgUrl: String
  }
  type Flag {
    id: ID!
    userId: ID!
    riskCategory: String!
    pestType: String!
    plantPart: String!
    location: Location!
  }
  type Query {
    getFlags: [Flag!]!
    getRiskCategories: [InputOption]!
    getPestTypes: [InputOption]!
    getPlantPart: [InputOption]!
  }
  type Mutation {
    login(email: String!, password: String!): Auth!
    addFlag(
      riskCategory: InputOptionInput!
      pestType: InputOptionInput!
      plantPart: InputOptionInput!
      location: LocationInput
    ): Flag!
  }
`;
