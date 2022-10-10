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
    type Query {
        all: [User]!
    }
    type Mutation {
        login(email: String!,password: String!):Auth!
    }
`