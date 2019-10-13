import { prisma, Prisma } from '../prisma/generated/prisma-client';
import { UserFragment } from '../types/fragments';

export const Query = {
    async user(parent, { id }: { id: string }, context, info) {
        const fragment = `
            fragment FullUser on User ${UserFragment}
        `;

        return await prisma
            .user({
                id,
            })
            .$fragment(fragment);
    },

    async name(parent, { id }: { id: string }, context, info) {
        return await prisma.name({
            id,
        });
    },

    async users(parent, args, context, info) {
        const fragment = `
            fragment FullUser on User ${UserFragment}
        `;

        return await prisma.users().$fragment(fragment);
    },
};
