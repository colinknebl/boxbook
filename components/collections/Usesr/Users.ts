import { Collection } from '../BaseCollection';
import { User } from '../../models/User';
import { GQLRequest } from '../../utils/GQLRequest';

const UsersQuery: string = `
    query getUsers {
        users {
            id
            name
        }
    }
`;

export class Users extends Collection<User> {
    static GQL_Query: string = UsersQuery;

    constructor() {
        super();
    }

    public async get(): Promise<User[]> {
        const req = new GQLRequest<{ users: User[] }>();
        const res = await req.get({
            query: Users.GQL_Query,
        });

        return res.users;
    }
}
