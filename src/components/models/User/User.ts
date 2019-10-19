import CookieParser from '../../utils/CookieParser';
import { OrgEvent } from '../OrgEvent';
import { Organization } from '../Organization';
import { Person } from '../Person';
import { DataRequest } from '../../utils/DataRequest/DataRequest';
import { UserFragment } from '../../../graphql/types/fragments';
import { LoginMutationReturnData } from '../../../graphql/resolvers/mutations';

interface UserInterface {}

interface INewUserData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    organizationCode: string;
}

const UserQuery: string = `
    query user($id: ID!) {
        user(where: {
            id: $id
        }) ${UserFragment}
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

const CreateUserMutation: string = `
    mutation createUser(
        $firstName: String!
        $lastName: String!
        $email: String!
        $username: String!
        $password: String!
        $organizationCode: String!
    ) {
        createUser(
            data: {
                firstName: $firstName
                lastName: $lastName
                email: $email
                username: $username
                password: $password
                organizationCode: $organizationCode
            }
        ) {
            id
            email
            password
        }
    }
`;

export class User extends Person implements UserInterface {
    /**
    /// **** Constructor ***********************************************
     */
    static UserQuery = UserQuery;
    static LoginMutation = LoginMutation;
    static CreateUserMutation = CreateUserMutation;
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

    static async CreateUser(data: INewUserData): Promise<User> {
        const req = new DataRequest<{ createUser: any }>({
            query: User.CreateUserMutation,
            variables: data,
            errorMessage: 'Error creating user!',
        });
        const res = await req.fetch();
        return res.data.createUser;
    }

    // *****************************************************************

    static async Fetch(userID: string) {
        const req = new DataRequest<{ user: any }>({
            query: User.UserQuery,
            variables: {
                id: userID,
            },
            errorMessage: 'Error fetching user!',
        });
        const res = await req.fetch();
        return res.data.user;
    }

    // *****************************************************************

    static async Login(
        email: string,
        password: string
    ): Promise<{ user: User; errors: Error[] }> {
        let user: User;
        const req = new DataRequest<{ login: LoginMutationReturnData }>({
            query: User.LoginMutation,
            variables: { email, password },
        });
        const res = await req.fetch();

        if (res.data) {
            user = new User(res.data.login.user);
            User.SetToken(res.data.login.token);
        }

        return {
            user,
            errors: res.errors,
        };
    }

    // *****************************************************************

    static Logout() {
        try {
            let cookieParser = new CookieParser();
            // remove token from localstorage
            window.localStorage.setItem(User.TokenKey, null);
            // remove token from cookies
            cookieParser.delete('token');
        } catch (error) {
            throw new Error('Error logging out: ' + error.message);
        }
    }

    // *****************************************************************

    static SetToken(token: string) {
        try {
            let cookieParser = new CookieParser();
            // set token in localstorage
            window.localStorage.setItem(User.TokenKey, token);
            // set token as cookie
            cookieParser.set('token', token);
        } catch (error) {
            throw new Error('Error setting token: ' + error.message);
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

    public getInitials(): string {
        return this.name.first.slice(0, 1) + this.name.last.slice(0, 1);
    }

    // *****************************************************************
}
