import { prisma } from '../prisma/generated/prisma-client';

export const Mutation = {
    async createUser(parent, args: { name: string }, context, unknown) {
        const newUser = await prisma.createUser({ name: args.name });
        return newUser;
    },
};
