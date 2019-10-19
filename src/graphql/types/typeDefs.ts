import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    scalar DateTime

    input NameWhereInput {
        id: ID
        id_not: ID
        id_in: [ID!]
        id_not_in: [ID!]
        id_lt: ID
        id_lte: ID
        id_gt: ID
        id_gte: ID
        id_contains: ID
        id_not_contains: ID
        id_starts_with: ID
        id_not_starts_with: ID
        id_ends_with: ID
        id_not_ends_with: ID
        first: String
        first_not: String
        first_in: [String!]
        first_not_in: [String!]
        first_lt: String
        first_lte: String
        first_gt: String
        first_gte: String
        first_contains: String
        first_not_contains: String
        first_starts_with: String
        first_not_starts_with: String
        first_ends_with: String
        first_not_ends_with: String
        last: String
        last_not: String
        last_in: [String!]
        last_not_in: [String!]
        last_lt: String
        last_lte: String
        last_gt: String
        last_gte: String
        last_contains: String
        last_not_contains: String
        last_starts_with: String
        last_not_starts_with: String
        last_ends_with: String
        last_not_ends_with: String
        AND: [NameWhereInput!]
    }

    input PersonWhereInput {
        id: ID
        id_not: ID
        id_in: [ID!]
        id_not_in: [ID!]
        id_lt: ID
        id_lte: ID
        id_gt: ID
        id_gte: ID
        id_contains: ID
        id_not_contains: ID
        id_starts_with: ID
        id_not_starts_with: ID
        id_ends_with: ID
        id_not_ends_with: ID
        email: String
        email_not: String
        email_in: [String!]
        email_not_in: [String!]
        email_lt: String
        email_lte: String
        email_gt: String
        email_gte: String
        email_contains: String
        email_not_contains: String
        email_starts_with: String
        email_not_starts_with: String
        email_ends_with: String
        email_not_ends_with: String
        name: NameWhereInput
        AND: [PersonWhereInput!]
    }

    input OrgEventWhereInput {
        id: ID
        id_not: ID
        id_in: [ID!]
        id_not_in: [ID!]
        id_lt: ID
        id_lte: ID
        id_gt: ID
        id_gte: ID
        id_contains: ID
        id_not_contains: ID
        id_starts_with: ID
        id_not_starts_with: ID
        id_ends_with: ID
        id_not_ends_with: ID
        name: String
        name_not: String
        name_in: [String!]
        name_not_in: [String!]
        name_lt: String
        name_lte: String
        name_gt: String
        name_gte: String
        name_contains: String
        name_not_contains: String
        name_starts_with: String
        name_not_starts_with: String
        name_ends_with: String
        name_not_ends_with: String
        coordinator: PersonWhereInput
        date: DateTime
        date_not: DateTime
        date_in: [DateTime!]
        date_not_in: [DateTime!]
        date_lt: DateTime
        date_lte: DateTime
        date_gt: DateTime
        date_gte: DateTime
        hourDuration: Float
        hourDuration_not: Float
        hourDuration_in: [Float!]
        hourDuration_not_in: [Float!]
        hourDuration_lt: Float
        hourDuration_lte: Float
        hourDuration_gt: Float
        hourDuration_gte: Float
        organization: OrganizationWhereInput
        createdAt: DateTime
        createdAt_not: DateTime
        createdAt_in: [DateTime!]
        createdAt_not_in: [DateTime!]
        createdAt_lt: DateTime
        createdAt_lte: DateTime
        createdAt_gt: DateTime
        createdAt_gte: DateTime
        AND: [OrgEventWhereInput!]
    }
    input AddressWhereInput {
        id: ID
        id_not: ID
        id_in: [ID!]
        id_not_in: [ID!]
        id_lt: ID
        id_lte: ID
        id_gt: ID
        id_gte: ID
        id_contains: ID
        id_not_contains: ID
        id_starts_with: ID
        id_not_starts_with: ID
        id_ends_with: ID
        id_not_ends_with: ID
        street1: String
        street1_not: String
        street1_in: [String!]
        street1_not_in: [String!]
        street1_lt: String
        street1_lte: String
        street1_gt: String
        street1_gte: String
        street1_contains: String
        street1_not_contains: String
        street1_starts_with: String
        street1_not_starts_with: String
        street1_ends_with: String
        street1_not_ends_with: String
        street2: String
        street2_not: String
        street2_in: [String!]
        street2_not_in: [String!]
        street2_lt: String
        street2_lte: String
        street2_gt: String
        street2_gte: String
        street2_contains: String
        street2_not_contains: String
        street2_starts_with: String
        street2_not_starts_with: String
        street2_ends_with: String
        street2_not_ends_with: String
        street3: String
        street3_not: String
        street3_in: [String!]
        street3_not_in: [String!]
        street3_lt: String
        street3_lte: String
        street3_gt: String
        street3_gte: String
        street3_contains: String
        street3_not_contains: String
        street3_starts_with: String
        street3_not_starts_with: String
        street3_ends_with: String
        street3_not_ends_with: String
        city: String
        city_not: String
        city_in: [String!]
        city_not_in: [String!]
        city_lt: String
        city_lte: String
        city_gt: String
        city_gte: String
        city_contains: String
        city_not_contains: String
        city_starts_with: String
        city_not_starts_with: String
        city_ends_with: String
        city_not_ends_with: String
        state: String
        state_not: String
        state_in: [String!]
        state_not_in: [String!]
        state_lt: String
        state_lte: String
        state_gt: String
        state_gte: String
        state_contains: String
        state_not_contains: String
        state_starts_with: String
        state_not_starts_with: String
        state_ends_with: String
        state_not_ends_with: String
        country: String
        country_not: String
        country_in: [String!]
        country_not_in: [String!]
        country_lt: String
        country_lte: String
        country_gt: String
        country_gte: String
        country_contains: String
        country_not_contains: String
        country_starts_with: String
        country_not_starts_with: String
        country_ends_with: String
        country_not_ends_with: String
        postCode: String
        postCode_not: String
        postCode_in: [String!]
        postCode_not_in: [String!]
        postCode_lt: String
        postCode_lte: String
        postCode_gt: String
        postCode_gte: String
        postCode_contains: String
        postCode_not_contains: String
        postCode_starts_with: String
        postCode_not_starts_with: String
        postCode_ends_with: String
        postCode_not_ends_with: String
        AND: [AddressWhereInput!]
    }

    input OrganizationWhereInput {
        id: ID
        id_not: ID
        id_in: [ID!]
        id_not_in: [ID!]
        id_lt: ID
        id_lte: ID
        id_gt: ID
        id_gte: ID
        id_contains: ID
        id_not_contains: ID
        id_starts_with: ID
        id_not_starts_with: ID
        id_ends_with: ID
        id_not_ends_with: ID
        code: String
        code_not: String
        code_in: [String!]
        code_not_in: [String!]
        code_lt: String
        code_lte: String
        code_gt: String
        code_gte: String
        code_contains: String
        code_not_contains: String
        code_starts_with: String
        code_not_starts_with: String
        code_ends_with: String
        code_not_ends_with: String
        address: AddressWhereInput
        director: PersonWhereInput
        name: String
        name_not: String
        name_in: [String!]
        name_not_in: [String!]
        name_lt: String
        name_lte: String
        name_gt: String
        name_gte: String
        name_contains: String
        name_not_contains: String
        name_starts_with: String
        name_not_starts_with: String
        name_ends_with: String
        name_not_ends_with: String
        AND: [OrganizationWhereInput!]
    }

    enum OrgEventOrderByInput {
        name_ASC
        name_DESC
        date_ASC
        date_DESC
        hourDuration_ASC
        hourDuration_DESC
        createdAt_ASC
        createdAt_DESC
    }

    enum OrganizationOrderByInput {
        code_ASC
        code_DESC
        name_ASC
        name_DESC
        createdAt_ASC
        createdAt_DESC
    }

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
        events(
            where: OrgEventWhereInput
            orderBy: OrgEventOrderByInput
            skip: Int
            after: String
            before: String
            first: Int
            last: Int
        ): [OrgEvent]!
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
        postCode: String
        settings: UserSettings
        isAdmin: Boolean
        log: UserLog!
        createdAt: String!
        friends: [User]!
        reserved(
            where: OrgEventWhereInput
            orderBy: OrgEventOrderByInput
            skip: Int
            after: String
            before: String
            first: Int
            last: Int
        ): [OrgEvent]!
        organizations(
            where: OrganizationWhereInput
            orderBy: OrganizationOrderByInput
            skip: Int
            after: String
            before: String
            first: Int
            last: Int
        ): [Organization]!
    }

    type AuthData {
        user: User!
        token: String!
        expiration: Int!
    }

    input CreateUserData {
        firstName: String!
        lastName: String!
        email: String!
        username: String!
        password: String!
        organizationCode: String
    }

    input LoginData {
        email: String!
        password: String!
    }

    input ReserveUnreserveData {
        userID: ID!
        eventID: ID!
    }

    input DeleteUserData {
        id: ID!
    }

    input UserQueryWhere {
        id: ID!
    }

    type Query {
        user(where: UserQueryWhere): User!
        users: [User!]!
        name(id: ID): Name!
    }

    type Mutation {
        createUser(data: CreateUserData!): User!
        deleteUser(data: DeleteUserData!): User!
        reserveUser(data: ReserveUnreserveData!): OrgEvent!
        unreserveUser(data: ReserveUnreserveData!): OrgEvent!
        login(data: LoginData!): AuthData
    }
`;
