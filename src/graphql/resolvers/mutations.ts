import {
    prisma,
    UserCreateInput,
    User,
} from '../prisma/generated/prisma-client';
import { OrgEventFragment, UserFragment } from '../types/fragments';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TOKEN_SIGNATURE, PASSWORD_SALT_ROUNDS } from '../../../.env/env';

export interface TokenData {
    userID: string;
    email: string;
}

export interface Context {
    isAuth: boolean;
    userID: string | undefined;
    email: string | undefined;
}

interface LoginData {
    data: {
        email: string;
        password: string;
    };
}

interface ReserveUnreserveData {
    data: {
        userID: string;
        eventID: string;
    };
}

interface CreateUserData {
    data: {
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        password: string;
        organizationCode?: string;
    };
}

export interface LoginMutationReturnData {
    token: string;
    expiration: number;
    user: User;
}

export const Mutation = {
    async createUser(parent, { data }: CreateUserData, context: Context, info) {
        const hashedPassword = await bcrypt.hash(
            data.password,
            process.env.PASSWORD_SALT_ROUNDS || PASSWORD_SALT_ROUNDS
        );
        const userData: UserCreateInput = {
            name: {
                create: {
                    first: data.firstName,
                    last: data.lastName,
                },
            },
            email: data.email,
            username: data.username,
            password: hashedPassword,
            log: {
                create: {},
            },
        };
        if (data.organizationCode) {
            userData.organizations = {
                connect: {
                    code: data.organizationCode,
                },
            };
        }

        const user = await prisma.createUser(userData);

        return user;
    },

    async login(
        parent,
        { data: { email, password } }: LoginData,
        context: Context,
        info
    ): Promise<LoginMutationReturnData> {
        const fragment = `
            fragment FullUser on User ${UserFragment}
        `;
        const user: User = await prisma
            .user({
                email,
            })
            .$fragment(fragment);
        if (!user) {
            throw new Error('User does not exist!');
        }
        console.log('TCL: user', user);

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid credentials!');
        }

        const jwtData: TokenData = {
            userID: user.id,
            email: user.email,
        };

        const token = jwt.sign(
            jwtData,
            process.env.TOKEN_SIGNATURE || TOKEN_SIGNATURE,
            {
                expiresIn: '1h',
            }
        );

        return {
            user,
            token,
            expiration: 1,
        };
    },

    async reserveUser(
        parent,
        { data }: ReserveUnreserveData,
        context: Context,
        info
    ) {
        console.log('TCL: context', context);
        const fragment = `
            fragment FullOrgEvent on OrgEvent ${OrgEventFragment}
        `;

        return await prisma
            .updateOrgEvent({
                where: {
                    id: data.eventID,
                },
                data: {
                    attendees: {
                        connect: {
                            id: data.userID,
                        },
                    },
                },
            })
            .$fragment(fragment);
    },

    async unreserveUser(
        parent,
        { data }: ReserveUnreserveData,
        context: Context,
        info
    ) {
        const fragment = `
            fragment FullOrgEvent on OrgEvent ${OrgEventFragment}
        `;

        return await prisma
            .updateOrgEvent({
                where: {
                    id: data.eventID,
                },
                data: {
                    attendees: {
                        disconnect: {
                            id: data.userID,
                        },
                    },
                },
            })
            .$fragment(fragment);
    },
};
