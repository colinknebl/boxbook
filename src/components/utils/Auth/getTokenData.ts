import jwt from 'jsonwebtoken';
import { IncomingMessage } from 'http';
import { NextApiRequest } from 'next';
import CookieParser from '../CookieParser';
import { TOKEN_SIGNATURE } from '../../../../.env/env';
import { TokenData } from '../../../../src/graphql/resolvers/mutations';
import { isClient } from '../isClient';

export function getTokenData(
    request: IncomingMessage | NextApiRequest
): TokenData {
    let cookieParser: CookieParser, tokenFromString: string;
    if (isClient()) {
        cookieParser = new CookieParser();
    } else {
        cookieParser = new CookieParser(request.headers.cookie);
    }
    tokenFromString = cookieParser.get('token');

    const validToken = jwt.verify(
        tokenFromString,
        process.env.TOKEN_SIGNATURE || TOKEN_SIGNATURE
    ) as TokenData;

    return validToken;
}
