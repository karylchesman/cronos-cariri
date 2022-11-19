import { ToastId, useToast, UseToastOptions } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { createContext, ReactNode, useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser, IUserSessionResponse } from '../@types/users';
import { api } from '../services/ApiService';
import { eventsInitialState, eventsReducer, IEventsContext, TEventsActions } from './stores/events';

interface IAppContext {
    user: IUser | null;
    events: IEventsContext;
    eventsDispatch: React.Dispatch<TEventsActions>;
    handleLogin: (email: string, password: string) => Promise<void | string>;
    handleLogOut: () => void;
}

export const AppContext = createContext({} as IAppContext);

interface IAppContextProviderProps {
    children: ReactNode;
}

const AppContextProvider = (props: IAppContextProviderProps) => {

    const [user, setUser] = useState<IUser | null>(null);
    const [events, eventsDispatch] = useReducer(eventsReducer, eventsInitialState);

    const pageNavigator = useNavigate();
    const toast = useToast();
    const toastIdRef = useRef<ToastId | null>();

    function toastClose() {
        if (toastIdRef.current) {
            toast.close(toastIdRef.current)
        }
    }

    function toastShow(toastOpts: UseToastOptions) {
        toastIdRef.current = toast(toastOpts)
    }

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

    async function getUserLoggedData(signal: AbortSignal) {
        const token = sessionStorage.getItem(String(import.meta.env.VITE_SESSION_KEY));

        if (token !== null && user === null) {
            try {
                const result = await api.get("/users/logged", {
                    signal
                });
                
                setUser(result.data);
            } catch (error: AxiosError | any) {
                
                toastShow({
                    title: "Sessão expirada.",
                    status: "warning",
                    duration: 2000,
                    variant: "left-accent",
                    position: "top"
                })
            }
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        getUserLoggedData(controller.signal);

        return () => {
            toastClose();
            controller.abort();
        }
    })

    return (
        <AppContext.Provider value={
            {
                user,
                events,
                eventsDispatch,
                handleLogin,
                handleLogOut
            } as IAppContext
        }>
            {props.children}
        </AppContext.Provider>
    );
}

export { AppContextProvider };