import { ApolloServer, gql } from 'apollo-server-micro';
import { typeDefs, resolvers } from '../../../graphql';

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({ path: '/api/v1/graphql' });
