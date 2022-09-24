import { IPerson } from "./persons";

export enum EUserRoles {
    "Administrador" = "Administrador",
    "Funcionário" = "Funcionário",
    "Esportista" = "Esportista"
}

export interface IUser {
    id?: string;
    name: string;
    email: string;
    role: EUserRoles;
    person_id?: string | null;
    person?: IPerson | undefined;
    created_at: Date;
    updated_at: Date;
}

export type IUserSessionResponse = {
    "user": {
        "id": string;
        "name": string;
        "email": string;
        "role": EUserRoles;
        "person_id": string | null;
        "person": IPerson | undefined;
        "created_at": Date;
        "updated_at": Date;
    },
    "token": {
        "access_token": string;
        "expires_in": Date;
    }
}