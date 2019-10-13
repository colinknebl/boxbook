import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Name {
        id: ID!
        first: String!
        last: String!
    }

    type Person {
        id: ID!
        email: String!
        image: String
        name: Name!
        phone: String
        createdAt: String!
    }

    enum EventTypes {
        CLASS
    }

    type OrgEvent {
        id: ID!
        name: String!
        attendees: [User]!
        coordinator: Person!
        date: String!
        eventType: [EventTypes!]!
        hourDuration: Float!
        image: String
        organization: Organization!
        createdAt: String!
    }

    type Address {
        id: ID!
        street1: String
        street2: String
        street3: String
        city: String
        state: String
        country: String
        postCode: String
    }

    type OrgSettings {
        id: ID!
    }

    type Organization {
        id: ID!
        code: String!
        address: Address
        admins: [User!]!
        director: Person!
        events: [OrgEvent]!
        image: String
        name: String!
        settings: OrgSettings
        createdAt: String!
    }

    type UserSettings {
        id: ID!
    }

    type LoggedLift {
        id: ID!
        weight: Int!
        date: String!
        reps: [Int!]!
        sets: Int!
        createdAt: String!
    }

    type Lift {
        id: ID!
        name: String
        history: [LoggedLift]!
        oneRepMax: LoggedLift
    }

    type Workout {
        id: ID!
        name: String!
        instructions: String!
        createdAt: String!
    }

    enum ScoreTypes {
        TIME
        REPS
        ROUNDS_TIME
        ROUNDS_REPS
    }

    type LoggedWorkout {
        id: ID!
        workout: Workout!
        score: String!
        scoreType: ScoreTypes
        createdAt: String!
    }

    type UserLog {
        id: ID!
        lifts: [Lift]!
        workouts: [LoggedWorkout]!
    }

    type User {
        id: ID!
        name: Name!
        email: String!
        phone: String
        image: String
        username: String!
        password: String!
        reserved: [OrgEvent]!
        organizations: [Organization]
        postCode: String
        settings: UserSettings
        isAdmin: Boolean
        friends: [User]!
        log: UserLog!
        createdAt: String!
    }

    type Query {
        user(id: ID): User!
        users: [User!]!
        name(id: ID): Name!
    }
    type Mutation {
        createUser(name: String!): User!
        reserveUser(userID: ID!, eventID: ID!): OrgEvent!
        unreserveUser(userID: ID!, eventID: ID!): OrgEvent!
    }
`;
