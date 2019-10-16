import { OrgEvent } from '../OrgEvent';
import { gql } from 'apollo-server-micro';
import { Organization } from '../Organization';
import { Person } from '../Person';
import { GQLRequest } from '../../utils/GQLRequest/GQLRequest';
import { UserFragment } from '../../../graphql/types/fragments';
import { OrgEventsCollection } from '../../collections/OrgEvents/OrgEventsCollection';
import { DocumentNode } from 'graphql';
import { LoginMutationReturnData } from '../../../graphql/resolvers/mutations';

interface UserInterface {}

const UserQuery: string = `
    query User($id: ID) {
        user(id: $id) ${UserFragment}
    }
`;

const LoginMutation: string = `
    mutation login($email: String!, $password: String!) {
        login(data: {
            email: $email
            password: $password
        }) {
            token
            expiration
            user ${UserFragment}
        }
    }
`;

export class User extends Person implements UserInterface {
    /**
    /// **** Constructor ***********************************************
     */
    static UserQuery = UserQuery;
    static LoginMutation = LoginMutation;
    static TokenKey = 'BoxBookToken';
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
                    orgs.push(new Organization(org, this));
                    return orgs;
                },
                [] as Organization[]
            );
        } else {
            this.organizations = [];
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
    get token(): string {
        return window.localStorage.getItem(User.TokenKey);
    }

    get reserved(): OrgEvent[] {
        return this.activeOrganization.getReserved(this);
    }

    get activeOrganization(): Organization {
        return this.organizations[0];
    }
    // *****************************************************************

    /**
    /// **** Methods ***************************************************
     */
    // ***** Static Methods ********************************************
    static async Fetch(userID: string) {
        const req = new GQLRequest<any>();
        const res = await req.get({
            query: (User.UserQuery as unknown) as string,
            variables: { id: userID },
        });
        return res.user;
    }

    // *****************************************************************

    static async Login(email: string, password: string) {
        const req = new GQLRequest<{ login: LoginMutationReturnData }>();
        const res = await req.get({
            query: User.LoginMutation,
            variables: {
                email,
                password,
            },
        });

        if (res && res.login) {
            window.localStorage.setItem(User.TokenKey, res.login.token);
            document.cookie = 'token=' + res.login.token;
            return new User(res.login.user);
        }
    }

    // *****************************************************************
    // ***** Private Methods *******************************************
    // *****************************************************************
    // ***** Protected Methods *****************************************
    // *****************************************************************
    // ***** Public Methods ********************************************

    public unreserve(event: OrgEvent) {
        return this.activeOrganization.unreserveFromEvent(event, this);
    }

    // *****************************************************************

    public reserve(event: OrgEvent) {
        return this.activeOrganization.reserveForEvent(event, this);
    }
    // *****************************************************************

    public getEvents(dates: Date[], selectedDay: number): OrgEvent[] {
        return this.activeOrganization.getEventsByDates(dates, selectedDay);
    }

    // *****************************************************************
}
