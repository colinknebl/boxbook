import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Post {
        title: String
        id: ID
    }
    type User {
        name: String
    }
    type SpecialUser {
        name: String
        age: Int
        status: String
    }
    type Query {
        users: [User!]!
        posts: [Post!]!
        post(id: ID): Post!
        specialUser: SpecialUser!
    }
    type Mutation {
        addPost(id: Int, title: String): ID
    }
`;
