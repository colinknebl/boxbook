import { prisma, Prisma, User } from '../prisma/generated/prisma-client';
import {
    UserFragment,
    OrganizationFragment,
    PersonFragment,
} from '../types/fragments';
import { Context } from './mutations';

export const Query = {
    async user(
        parent,
        args: { where: { id: string } },
        context: Context,
        info
    ) {
        // const fragment = `
        //     fragment FullUserQuery on User ${UserFragment}
        // `;

        const user = await prisma
            .user({
                id: args.where.id,
            })
            .$fragment(UserFragment);

        const reserved = await prisma
            .user({
                id: args.where.id,
            })
            .reserved({
                where: {
                    date_gte: new Date().toISOString(),
                },
            });

        user['reserved'] = reserved;

        return user;
    },

    async name(parent, { id }: { id: string }, context: Context, info) {
        return await prisma.name({
            id,
        });
    },

    async users(parent, args, context: Context, info) {
        // const fragment = `
        //     fragment FullUserUsers on User ${UserFragment}
        // `;

        return await prisma.users().$fragment(UserFragment);
    },
};
