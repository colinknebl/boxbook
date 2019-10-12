import { DEV, PROD, TEST } from '../../../.env/env';

interface IConfig {
    GQL_ENDPOINT: string;
}

let config: IConfig;
switch (process.env.NODE_ENV) {
    case 'test':
        config = TEST;
        break;
    case 'production':
        config = PROD;
        break;
    default:
        config = DEV;
}

export default config;
