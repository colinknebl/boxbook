import { AppContext } from 'next/app';
import router from 'next/router';

interface IOptions {
    shallow: true;
}

export function redirect(
    appContext: AppContext,
    path: string,
    options: IOptions = { shallow: true }
) {
    if (!router && !appContext) {
        throw new Error('Error redirecting!');
    }

    if (router) {
        router.push(path, path, {
            shallow: options.shallow,
        });
        return;
    }

    if (appContext.ctx.res) {
        appContext.ctx.res.writeHead(302, {
            Location: path,
        });
        appContext.ctx.res.end();
    } else {
        appContext.router.push(path);
    }
}
