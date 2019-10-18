import { prisma, Prisma, User } from '../prisma/generated/prisma-client';
import { UserFragment } from '../types/fragments';
import { Context } from './mutations';

export const Query = {
    async user(parent, { id }: { id: string }, context: Context, info) {
        const fragment = `
            fragment FullUser on User ${UserFragment}
        `;

        return await prisma
            .user({
                id,
            })
            .$fragment(fragment);
    },

    async name(parent, { id }: { id: string }, context: Context, info) {
        return await prisma.name({
            id,
        });
    },

    async users(parent, args, context: Context, info) {
        const fragment = `
            fragment FullUser on User ${UserFragment}
        `;

        return await prisma.users().$fragment(fragment);
    },
};
