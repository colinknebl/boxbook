import { prisma } from '../prisma/generated/prisma-client';

export const Query = {
    async user(parent, { id }: { id: string }, context, info) {
        return await prisma.user({ id });
    },

    async users(parent, args, context, info) {
        return await prisma.users();
    },
};
