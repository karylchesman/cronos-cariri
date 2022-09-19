import { createContext, ReactNode, useState } from 'react';

export enum EPersonGender {
    "Masculino" = "Masculino",
    "Feminino" = "Feminino"
}

export interface IPerson {
    id?: string;
    name: string;
    email: string;
    phonenumber1: string;
    phonenumber2?: string;
    gender: EPersonGender;
    cpf: string;
    rg?: string;
    bith_date: Date;
    blood_type?: string;
    address_street: string;
    address_number: string;
    address_district: string;
    address_city: string;
    address_uf: string;
    address_cep: string;
    created_at: Date;
    updated_at: Date;
}

export enum EUserRoles {
    "Administrador" = "Administrador",
    "Funcionário" = "Funcionário",
    "Esportista" = "Esportista"
}

interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: EUserRoles;
    person_id?: string | null;
    person?: IPerson | undefined;
    created_at: Date;
    updated_at: Date;
}

interface IAppContext {
    user: IUser | null;
    handleLogin: (email: string, password: string) => Promise<void>;
    handleLogOut: () => void;
}

export const AppContext = createContext({} as IAppContext);

interface IAppContextProviderProps {
    children: ReactNode;
}

const AppContextProvider = (props: IAppContextProviderProps) => {

    const [user, setUser] = useState<IUser | null>(null);

    async function handleLogin(email: string, password: string) { }

    function handleLogOut() { }

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