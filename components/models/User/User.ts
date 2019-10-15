import { OrgEvent } from '../OrgEvent';
import { Organization } from '../Organization';
import { Person } from '../Person';
import { GQLRequest } from '../../utils/GQLRequest/GQLRequest';
import { UserFragment } from '../../../graphql/types/fragments';
import { OrgEventsCollection } from '../../collections/OrgEvents/OrgEventsCollection';

interface UserInterface {}

/**
  query User($id: ID) {
        user(
            where: {
                id: $id
            }
        ) ${UserFragment}
    }
 */

const UserQuery: string = `
    query User($id: ID) {
        user(id: $id) ${UserFragment}
    }
`;

export class User extends Person implements UserInterface {
    /**
    /// **** Constructor ***********************************************
     */
    static Query = UserQuery;
    constructor(user: any) {
        super(user.id, user.name, user.email, user.phone, user.image);

        this.username = user.username;
        this.postCode = user.postCode;
        this.settings = user.settings;
        this.isAdmin = user.isAdmin;
        this.friends = user.friends;
        this.log = user.log;
        this.createdAt = user.createdAt;

        if (Array.isArray(user.organizations)) {
            this.organizations = user.organizations.reduce(
                (orgs: Organization[], org: any) => {
                    orgs.push(new Organization(org));
                    return orgs;
                },
                [] as Organization[]
            );
        }

        if (Array.isArray(user.reserved)) {
            const reserved = user.reserved.reduce(
                (events: OrgEvent[], event: OrgEvent) => {
                    events.push(new OrgEvent(event, event.organization, true));
                    return events;
                },
                [] as OrgEvent[]
            );
            this.reserved = new OrgEventsCollection(reserved);
        }
    }

    /**
    /// **** Properties ************************************************
     */
    // ***** Static Props **********************************************
    // *****************************************************************
    // ***** Private Props *********************************************
    // *****************************************************************
    // ***** Protected Props *******************************************
    public username: string;
    public reserved: OrgEventsCollection;
    public organizations: Organization[];
    public postCode: string;
    public settings: {
        id: string;
    };
    public isAdmin: boolean;
    public friends: User[];
    public log: {
        id: string;
    };
    public createdAt: Date;
    // *****************************************************************
    // ***** Public Props & Getters/Setters ****************************
    // *****************************************************************

    /**
    /// **** Methods ***************************************************
     */
    // ***** Static Methods ********************************************
    static async Fetch(userID: string) {
        const req = new GQLRequest<any>();
        const res = await req.get({
            query: User.Query,
            variables: { id: userID },
        });
        const user = new User(res.user);
        return user;
    }
    // *****************************************************************
    // ***** Private Methods *******************************************
    // *****************************************************************
    // ***** Protected Methods *****************************************
    // *****************************************************************
    // ***** Public Methods ********************************************
    // *****************************************************************
}
