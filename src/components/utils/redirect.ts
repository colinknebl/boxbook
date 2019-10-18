import { AppContext } from 'next/app';

export function redirect(appContext: AppContext, path: string) {
    if (appContext.ctx.res) {
        appContext.ctx.res.writeHead(302, {
            Location: path,
        });
        appContext.ctx.res.end();
    } else {
        appContext.router.push(path);
    }
}
