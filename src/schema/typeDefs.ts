import { gql } from "apollo-server"

export const typeDefs = gql`
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
    type Flag {
        id: ID!
        userId: ID!
        riskCategory: String!
        pestType: String!
        plantPart: String!
        location: Location!
    }
    type Query {
        getFlags:[Flag!]!
    }
    type Mutation {
        login(email: String!,password: String!):Auth!
        addFlag(riskCategory: String!,pestType: String!,plantPart: String!,location: LocationInput):Flag!
    }

`