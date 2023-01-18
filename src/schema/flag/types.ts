import { gql } from 'apollo-server';

const flagTypes = gql`
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
    getAllFlags(page: Int, limit: Int): [Flag]!
  }

  type Mutation {
    addFlag(
      riskCategory: InputOption!
      riskCategoryType: InputOption!
      plantPart: InputOption!
      location: LocationInput
    ): Flag!
  }
`;

export default flagTypes;
