import { gql } from 'apollo-server';

export default gql`
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
  input LocationInput {
    left: [String]!
    right: [String]!
  }
  type Location {
    left: [String]!
    right: [String]!
  }
  input InputOption {
    name: String!
    imgUrl: String
  }
  type InputOptionType {
    name: String!
    imgUrl: String
  }
  type RiskCategoryType {
    id: ID!
    name: String!
    imgUrl: String
  }
  type RiskCategory {
    id: ID
    name: String!
    imgUrl: String
    riskCategoryTypes: [RiskCategoryType]
  }
  type PlantPart {
    id: ID
    name: String!
    imgUrl: String
  }
  type Flag {
    id: ID!
    userId: ID!
    riskCategory: InputOptionType!
    riskCategoryType: InputOptionType!
    plantPart: InputOptionType!
    location: Location!
    createdAt: String!
  }
  type Query {
    getFlags: [Flag]!
    getRiskCategories: [RiskCategory]!
    getRiskCategory(id: ID!): RiskCategory!
    getPlantPart: [PlantPart]!
    getUsers: [User!]!
    getAllFlags: [Flag!]!
  }
  type Mutation {
    login(email: String!, password: String!): Auth!
    addFlag(
      riskCategory: InputOption!
      riskCategoryType: InputOption!
      plantPart: InputOption!
      location: LocationInput
    ): Flag!
    createUser(username: String!, email: String!, password: String!): User!
    updateUser(
      id: ID!
      username: String
      email: String
      password: String
    ): User!
    deleteUser(id: ID!): String!
    createRiskCategory(
      name: String!
      imgUrl: String!
      riskCategoryTypes: [InputOption!]!
    ): RiskCategory!
    deleteRiskCategory(id: ID!): String!
    updateRiskCategory(id: ID!, name: String, imgUrl: String): RiskCategory!
  }
`;
