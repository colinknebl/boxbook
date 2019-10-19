import React from 'react';
import { User } from '../../models/User/User';

export interface IMainAppContext {
    login(
        email: string,
        password: string
    ): Promise<{ user: User; errors: Error[] }>;
    logout(): boolean;
    user: User;
}
const MainAppContext: React.Context<IMainAppContext> = React.createContext({
    login: async (email: string, password: string) => {
        return null;
    },
    logout: () => null,
    user: null,
});

export default MainAppContext;
