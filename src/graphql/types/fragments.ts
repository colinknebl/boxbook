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
    events(orderBy: date_ASC) {
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

export const UserFragment = `{
    id
    name ${NameFragment}
    email
    phone
    image
    username
    password
    reserved(orderBy: date_ASC) {
        id
        date
        name
        hourDuration
        image
        createdAt
        attendees {
            id
            name ${NameFragment}
            organizations ${OrganizationFragment}
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
