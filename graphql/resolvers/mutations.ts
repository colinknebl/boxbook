import { prisma } from '../prisma/generated/prisma-client';
import { OrgEventFragment } from '../types/fragments';

export const Mutation = {
    async createUser(parent, args: { name: string }, context, info) {
        console.log('TCL: createUser -> name', name);
        // const newUser = await prisma.createUser({ name: args.name });
        // return newUser;
    },

    async reserveUser(
        parent,
        args: { eventID: string; userID: string },
        context,
        info
    ) {
        const fragment = `
            fragment FullOrgEvent on OrgEvent ${OrgEventFragment}
        `;

        return await prisma
            .updateOrgEvent({
                where: {
                    id: args.eventID,
                },
                data: {
                    attendees: {
                        connect: {
                            id: args.userID,
                        },
                    },
                },
            })
            .$fragment(fragment);
    },

    async unreserveUser(
        parent,
        args: { eventID: string; userID: string },
        context,
        info
    ) {
        const fragment = `
            fragment FullOrgEvent on OrgEvent ${OrgEventFragment}
        `;

        return await prisma
            .updateOrgEvent({
                where: {
                    id: args.eventID,
                },
                data: {
                    attendees: {
                        disconnect: {
                            id: args.userID,
                        },
                    },
                },
            })
            .$fragment(fragment);
    },
};
