import fetch from 'cross-fetch';
import config from '../Config/config';

interface IGQLRequestBody {
    operationName?: string;
    variables?: Object;
    query: string;
}

interface GraphQLError {
    message: string;
    extensions: {
        code: string;
        exception: {
            stacktrace: string[];
        };
    };
    locations: Array<{ column: number; line: number }>;
    path: string[];
}

interface IResponseData<T> {
    data: T;
    errors: GraphQLError[];
}

interface IRequestOptions {
    query: string;
    variables: object;
    operationName?: string;
    errorMessage?: string;
}

type RequestMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';

export class DataRequest<T> {
    /**
    /// **** Constructor ***********************************************
     */
    constructor(options: IRequestOptions) {
        this._onClient = Boolean(process.browser);

        this.query = options.query;
        this.variables = options.variables;
        this._errorMessage = options.errorMessage;
        this._operationName = options.operationName;
    }

    /**
    /// **** Properties ************************************************
     */
    // ***** Static Props **********************************************
    static URI: string = config.GQL_ENDPOINT;
    static Headers = {
        'Content-Type': 'application/json',
        accept: '*/*',
    };
    static Mode: RequestMode = 'cors';
    static Method: RequestMethod = 'POST';
    // *****************************************************************
    // ***** Private Props *********************************************
    private _onClient: boolean;
    private _response: Response;
    private _errorMessage: string;
    private _operationName?: string;
    // *****************************************************************
    // ***** Protected Props *******************************************
    // *****************************************************************
    // ***** Public Props & Getters/Setters ****************************
    public query: string;
    public variables: object;
    public isComplete: boolean = false;
    public success: boolean;
    public data: IResponseData<T>;
    // *****************************************************************

    /**
    /// **** Methods ***************************************************
     */
    // ***** Static Methods ********************************************
    // *****************************************************************
    // ***** Private Methods *******************************************

    private _addError(errors: Error[]) {
        if (!this._errorMessage) return;
        errors.push(new Error(this._errorMessage));
        return errors;
    }

    // *****************************************************************

    private _sendNetworkRequest(): Promise<{
        data: T;
        errors: any[];
    }> {
        return new Promise((resolve, reject) => {
            const headers = {
                ...DataRequest.Headers,
                // Authorization:
                //     'Bearer ' + window.localStorage.getItem(User.TokenKey),
            };

            const body: IGQLRequestBody = {
                query: this.query,
                variables: this.variables,
            };

            if (this._operationName) {
                body.operationName = this._operationName;
            }
            fetch(DataRequest.URI, {
                method: DataRequest.Method,
                mode: DataRequest.Mode,
                headers,
                body: JSON.stringify(body),
            })
                .then(response => {
                    this._response = response;
                    return response.json();
                })
                .then((parsed: IResponseData<T>) => {
                    this.isComplete = true;
                    this.data = parsed;

                    if (parsed.errors && parsed.errors.length) {
                        const errors = parsed.errors.map(
                            err => new Error(err.message)
                        );
                        this.success = false;
                        resolve({
                            data: null,
                            errors: this._addError(errors) || parsed.errors,
                        });
                    } else {
                        this.success = true;
                        resolve({
                            data: parsed.data,
                            errors: parsed.errors,
                        });
                    }
                })
                .catch(error => {
                    this.success = false;
                    reject({
                        data: null,
                        errors: [new Error(error.message)],
                    });
                });
        });
    }

    // *****************************************************************
    // ***** Protected Methods *****************************************
    // *****************************************************************
    // ***** Public Methods ********************************************

    public fetch() {
        return this._sendNetworkRequest();
    }

    // *****************************************************************
}
