import { gql } from "apollo-server"

export const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
    }

    type Query {
        test:String!
    }
`