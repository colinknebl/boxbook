import config from '../Config/config';
import { User } from '../../models/User';

interface IRequestOptions {
    operationName?: string;
    variables?: Object;
}

interface IQueryOptions extends IRequestOptions {
    query: string;
}

interface IMutationOptions extends IRequestOptions {
    mutation: string;
}

interface IGQLRequest<T> {
    get(options: IQueryOptions): Promise<T>;
}

type RequestMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';

export class GQLRequest<T> implements IGQLRequest<T> {
    static URI: string = '';
    static Headers = {
        'Content-Type': 'application/json',
        accept: '*/*',
    };
    static Mode: RequestMode = 'cors';
    static Method: RequestMethod = 'POST';

    constructor() {
        if (!GQLRequest.URI) {
            GQLRequest.URI = config.GQL_ENDPOINT;
        }
    }

    private async _sendNetworkRequest(
        options: IMutationOptions | IQueryOptions
    ): Promise<T> {
        const headers = {
            ...GQLRequest.Headers,
            // Authorization:
            //     'Bearer ' + window.localStorage.getItem(User.TokenKey),
        };
        const response = await fetch(GQLRequest.URI, {
            method: GQLRequest.Method,
            mode: GQLRequest.Mode,
            headers,
            body: JSON.stringify(options),
        });

        const parsed = await response.json();

        console.log('TCL: GQLRequest<T> -> response', response);
        console.log('TCL: GQLRequest<T> -> parsed', parsed);

        if (parsed.errors && parsed.errors.length) {
            throw new Error(
                'Error with GQLRequest: ' + parsed.errors[0].message
            );
        } else {
            console.log('TCL: GQLRequest<T> -> parsed', parsed);
            return parsed.data;
        }
    }

    public async set(options: IQueryOptions): Promise<T> {
        return this._sendNetworkRequest(options);
    }

    /**
     * @param options.operationName If there are multiple queries/mutations in the query string, use the operationName to tell GraphQL which query/mutation to run
     * @param options.variables If there are variables required in the query/mutation, pass them in via the variables object
     */
    public async get(options: IQueryOptions): Promise<T> {
        return this._sendNetworkRequest(options);
    }
}
