import config from '../Config/config';

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
        const response = await fetch(GQLRequest.URI, {
            method: GQLRequest.Method,
            mode: GQLRequest.Mode,
            headers: GQLRequest.Headers,
            body: JSON.stringify(options),
        });

        const parsed: {
            data?: T;
            error?: Error;
        } = await response.json();

        if (parsed && parsed.data) {
            return parsed.data;
        } else {
            throw new Error('Error with GQLRequest: ' + parsed.error);
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
