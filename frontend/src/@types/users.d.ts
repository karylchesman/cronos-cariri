import { IPerson } from "./persons";

export interface IUser {
    id?: string;
    name: string;
    email: string;
    person_id?: string | null;
    person?: IPerson | undefined;
    created_at: Date;
    updated_at: Date;
    permissions: string[];
}

export type IUserSessionResponse = {
    "user": {
        "id": string;
        "name": string;
        "email": string;
        "person_id": string | null;
        "person": IPerson | undefined;
        "permissions": string[];
        "created_at": Date;
        "updated_at": Date;
    },
    "token": {
        "access_token": string;
        "expires_in": Date;
    }
}