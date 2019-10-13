import ApolloClient from 'apollo-client';

type Client = ApolloClient<unknown>;

interface StateInterface {
    get(): Promise<any>;
    set(key: any): Promise<boolean>;
}

export class State implements StateInterface {
    constructor(client: Client) {
        this._client = client;
    }

    private _client: Client;

    public async get() {}
    public async set(key: any) {
        return true;
    }
}
