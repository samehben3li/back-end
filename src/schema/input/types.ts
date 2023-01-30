import { gql } from 'apollo-server';

const inputTypes = gql`
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

  input InputOption {
    name: String
    imgUrl: String
  }

  type Query {
    getRiskCategories: [RiskCategory]!
    getRiskCategory(id: ID!): RiskCategory!
    getPlantPart: [PlantPart]!
  }

  type Mutation {
    createRiskCategory(
      name: String!
      imgUrl: String!
      riskCategoryTypes: [InputOption!]!
    ): RiskCategory!

    deleteRiskCategory(id: ID!): String!

    updateRiskCategory(id: ID!, name: String, imgUrl: String): RiskCategory!

    addRiskCategoryType(
      id: ID!
      name: String!
      imgUrl: String!
    ): RiskCategoryType!

    deleteRiskCategoryType(
      riskCategoryId: ID!
      riskCategoryTypeId: ID!
    ): String!

    updateRiskCategoryType(
      riskCategoryId: ID!
      riskCategoryTypeId: ID!
      riskCategoryType: InputOption
    ): RiskCategoryType!

    getUploadURL(imgName: String!): String!
  }
`;
export default inputTypes;
