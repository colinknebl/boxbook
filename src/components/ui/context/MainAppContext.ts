import React from 'react';

export interface MainAppContext {
    login(email: string, password: string): Promise<boolean>;
}
const MainAppContext: React.Context<MainAppContext> = React.createContext({
    login: async (email: string, password: string) => {
        return null;
    },
});

export default MainAppContext;
