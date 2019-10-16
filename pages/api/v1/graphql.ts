import { ApolloServer, Config } from 'apollo-server-micro';
import jwt from 'jsonwebtoken';
import { typeDefs, resolvers } from '../../../graphql';
import { TokenData } from '../../../graphql/resolvers/mutations';
import { TOKEN_SIGNATURE } from '../../../.env/env';
import { NextApiRequest, NextApiResponse } from 'next';

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
        console.log('TCL: cookies', req.cookies);
        if (!req.headers.authorization) {
            throw new Error('No authorization headers found!');
        }
        // 1. Get the authorization header. in the form of "Bearer eyJhbGciOiJIUzI1N..."
        const authHeader = req.headers.authorization.split(' ')[1];

        // 2. Verify the token is valid
        const token = jwt.verify(
            authHeader,
            process.env.TOKEN_SIGNATURE || TOKEN_SIGNATURE
        ) as TokenData;

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
