import { isClient } from '../isClient';

interface CookierParserInterface {
    cookies: object;
    get(name: string): string;
    set(name: string, value: string): string;
    delete(name: string): string;
}

class CookieParser implements CookierParserInterface {
    constructor(private _cookies?: string) {
        this._isClient = isClient();

        let cookie: string;
        if (this._cookies) {
            cookie = this._cookies;
        }
        if (!cookie && this._isClient) {
            cookie = document.cookie;
        }

        this._parsedCookies = this._parseCookies(cookie.split(';'));
    }

    get cookies() {
        return this._parsedCookies;
    }

    private _isClient: boolean;
    private _parsedCookies: { [key: string]: string };

    private _parseCookies(cookies: string[]) {
        return cookies.reduce((obj, cookie) => {
            const [key, val] = cookie.split('=');
            if (!key) {
                return obj;
            }
            obj[key.trim()] = val.trim();
            return obj;
        }, {});
    }

    private _update(cookies) {
        this._cookies = cookies;
        this._parsedCookies = this._parseCookies(this._cookies.split(';'));
    }

    public get(name: string): string {
        return this._parsedCookies[name];
    }

    public set(name: string, value: string): string {
        if (this._isClient) {
            document.cookie = `${name}=${value};`;
            this._update(document.cookie);
            return document.cookie;
        }
    }

    public delete(name: string): string {
        if (this._isClient) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
            this._update(document.cookie);
            return document.cookie;
        }
    }
}

export default CookieParser;
