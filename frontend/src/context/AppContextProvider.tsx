import { AxiosError } from 'axios';
import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser, IUserSessionResponse } from '../@types/users';
import { api } from '../services/ApiService';

interface IAppContext {
    user: IUser | null;
    handleLogin: (email: string, password: string) => Promise<void | string>;
    handleLogOut: () => void;
}

export const AppContext = createContext({} as IAppContext);

interface IAppContextProviderProps {
    children: ReactNode;
}

const AppContextProvider = (props: IAppContextProviderProps) => {

    const [user, setUser] = useState<IUser | null>(null);
    const pageNavigator = useNavigate();

    async function handleLogin(email: string, password: string) {
        const result = await api.post<IUserSessionResponse>("/users/session", { email, password });

        setUser(result.data.user);

        sessionStorage.setItem(String(import.meta.env.VITE_SESSION_KEY), result.data.token.access_token);

        pageNavigator("/");
    }

    function handleLogOut() { 
        sessionStorage.removeItem(String(import.meta.env.VITE_SESSION_KEY));
        setUser(null)
        pageNavigator("/");
    }

    return (
        <AppContext.Provider value={
            {
                user,
                handleLogin,
                handleLogOut
            } as IAppContext
        }>
            {props.children}
        </AppContext.Provider>
    );
}

export { AppContextProvider };