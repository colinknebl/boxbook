import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type User {
        name: String
        id: ID
    }
    type Query {
        user(id: ID): User!
        users: [User!]!
    }
    type Mutation {
        createUser(name: String!): User!
    }
`;
