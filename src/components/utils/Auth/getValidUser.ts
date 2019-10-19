import { IncomingMessage } from 'http';
import { NextApiRequest } from 'next';
import { User } from '../../models/User';
import { getTokenData } from './getTokenData';

export async function getValidUser(request: IncomingMessage | NextApiRequest) {
    let user;

    const tokenData = getTokenData(request);

    user = await User.Fetch(tokenData.userID);

    return user;
}
