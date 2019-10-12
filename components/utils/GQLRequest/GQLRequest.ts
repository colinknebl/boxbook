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
    static Headers: Headers = new Headers({
        'Content-Type': 'application/json',
        accept: '*/*',
    });
    static Mode: RequestMode = 'cors';
    static Method: RequestMethod = 'POST';

    constructor() {
        if (!GQLRequest.URI) {
            GQLRequest.URI = config.GQL_ENDPOINT;
        }
    }

    /**
     * @param options.operationName If there are multiple queries/mutations in the query string, use the operationName to tell GraphQL which query/mutation to run
     * @param options.variables If there are variables required in the query/mutation, pass them in via the variables object
     */
    public async get(options: IQueryOptions): Promise<T> {
        const response = await fetch(GQLRequest.URI, {
            method: GQLRequest.Method,
            mode: GQLRequest.Mode,
            headers: GQLRequest.Headers,
            body: JSON.stringify(options),
        });

        return await response.json();
    }
}
