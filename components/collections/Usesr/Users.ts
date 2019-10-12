import { Collection } from '../BaseCollection';
import { User } from '../../models/User';

const UsersQuery: string = `
    query getUsers {
        users {
            name
            id
        }
    }
`;

export class Users extends Collection<User> {
    static GQL_Query: string = UsersQuery;

    constructor() {
        super();
    }
}
