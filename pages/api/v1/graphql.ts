import { ApolloServer, Config } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import { typeDefs, resolvers } from '../../../src/graphql';
import { getTokenData } from '../../../src/components/utils/Auth/getTokenData';

const serverConfig: Config = {
    typeDefs,
    resolvers,
    context: setAuthData,
};

const server = new ApolloServer(serverConfig);

export const config = {
    api: {
        bodyParser: false,
    },
};

export default server.createHandler({
    path: '/api/v1/graphql',
});

/**
 * Parses authorization header on req headers, and adds user metadata to
 * context object if the user's JWT is valid.
 */
function setAuthData({
    req,
    res,
}: {
    req: NextApiRequest;
    res: NextApiResponse;
}) {
    let userID: string,
        email: string,
        isAuth: boolean = false;
    try {
        const token = getTokenData(req);
        /**
         3. If here, the token is valid - sets the userID, email, and isAuth 
            keys on the context object which is then available in the GraphQL 
            queries and mutations 'context' argument (3rd arg)
        */
        userID = token.userID;
        email = token.email;
        isAuth = Boolean(token.userID && token.email);
    } catch (err) {
        const error: Error = err; // catch block can't have a type annotation? Why?
        userID = undefined;
        email = undefined;
        isAuth = false;
    }
    return { isAuth, userID, email };
}
