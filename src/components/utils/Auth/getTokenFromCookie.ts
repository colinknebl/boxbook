import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { AppContext } from 'next/app';
import { TOKEN_SIGNATURE } from '../../../../.env/env';
import { TokenData } from '../../../../src/graphql/resolvers/mutations';

export function getTokenFromCookie(appContext: AppContext): TokenData {
    // 1. get the token from the cookie
    const parsed = cookie.parse(appContext.ctx.req.headers.cookie) as {
        token: string;
    };
    if (!parsed.token) {
        throw new Error('No valid token found!');
    }
    // 2. Verify the token is valid
    return jwt.verify(
        parsed.token,
        process.env.TOKEN_SIGNATURE || TOKEN_SIGNATURE
    ) as TokenData;
}
