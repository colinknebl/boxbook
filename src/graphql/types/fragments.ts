export const NameFragment = `{
    first
    last
}`;

export const AddressFragment = `{
    id
    street1
    street2
    street3
    city
    state
    country
    postCode
}`;

export const PersonFragment = `{
    id
    name {
        first
        last
    }
    email
    phone
}`;

export const OrganizationFragment = `{
    id
    code
    address ${AddressFragment}
    admins {
        id
        name ${NameFragment}
    }
    director {
        id
        name ${NameFragment}
        email
        phone
    }
    events(orderBy: date_ASC, where: {
        date_gte: "${new Date().toISOString()}"
    }) {
        id
        date
        name
        hourDuration
        image
        createdAt
        attendees {
            id
            name ${NameFragment}
        }
        coordinator ${PersonFragment}
        eventType
    }
    image
    name
    settings {
        id
    }
    createdAt
}`;

enum OrgEventOrderByInput {
    name_ASC = 'name_ASC',
    name_DESC = 'name_DESC',
    date_ASC = 'date_ASC',
    date_DESC = 'date_DESC',
    hourDuration_ASC = 'hourDuration_ASC',
    hourDuration_DESC = 'hourDuration_DESC',
    createdAt_ASC = 'createdAt_ASC',
    createdAt_DESC = 'createdAt_DESC',
}

type OrgEventWhereInput = {
    id: string;
    id_not: string;
    id_in: string[];
    id_not_in: string[];
    id_lt: string;
    id_lte: string;
    id_gt: string;
    id_gte: string;
    id_contains: string;
    id_not_contains: string;
    id_starts_with: string;
    id_not_starts_with: string;
    id_ends_with: string;
    id_not_ends_with: string;
    name: string;
    name_not: string;
    name_in: string[];
    name_not_in: string[];
    name_lt: string;
    name_lte: string;
    name_gt: string;
    name_gte: string;
    name_contains: string;
    name_not_contains: string;
    name_starts_with: string;
    name_not_starts_with: string;
    name_ends_with: string;
    name_not_ends_with: string;
    // coordinator: PersonWhereInput
    date: string;
    date_not: string;
    date_in: string[];
    date_not_in: string[];
    date_lt: string;
    date_lte: string;
    date_gt: string;
    date_gte: string;
    hourDuration: number;
    hourDuration_not: number;
    hourDuration_in: number[];
    hourDuration_not_in: number[];
    hourDuration_lt: number;
    hourDuration_lte: number;
    hourDuration_gt: number;
    hourDuration_gte: number;
    // organization: OrganizationWhereInput
    createdAt: string;
    createdAt_not: string;
    createdAt_in: string[];
    createdAt_not_in: string[];
    createdAt_lt: string;
    createdAt_lte: string;
    createdAt_gt: string;
    createdAt_gte: string;
    // AND: [OrgEventWhereInput!]
};

interface UserFragmentOptions {
    reserved: {
        orderBy: OrgEventOrderByInput;
        where: Partial<OrgEventWhereInput>;
    };
}

export const UserFragment = `{
    id
    name ${NameFragment}
    email
    phone
    image
    username
    password
    reserved {
        id
        date
        name
        hourDuration
        image
        createdAt
        attendees {
            id
            name {
                first
                last
            }
            username
            email
        }
        coordinator ${PersonFragment}
        eventType 
        organization ${OrganizationFragment}
    }
    organizations ${OrganizationFragment}
    postCode
    settings {
        id
    }
    isAdmin
    friends {
        id
    }
    log {
        id
    }
    createdAt
}`;

export const OrgEventFragment = `{
    id
    date
    name
    hourDuration
    image
    createdAt
    attendees ${UserFragment}
    coordinator ${PersonFragment}
    eventType 
    organization ${OrganizationFragment}

}`;
