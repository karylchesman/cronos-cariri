import { IPerson } from "./persons";

export interface IPermission {
    id: string;
    name: string;
    identifier: string;
    created_at: Date;
    updated_at: Date;
}

export interface IRole {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface IUser {
    id?: string;
    name: string;
    email: string;
    person_id?: string | null;
    person?: IPerson | undefined;
    created_at: Date;
    updated_at: Date;
    roles: Pick<Role, "name">[];
    permissions: Pick<Permission, "name" | "identifier">[];
}

export type IUserSessionResponse = {
    user: {
        id: string;
        name: string;
        email: string;
        person_id: string | null;
        person: IPerson | undefined;
        created_at: Date;
        updated_at: Date;
        roles: Role[];
        permissions: Permission[];
    };
    token: {
        access_token: string;
        expires_in: Date;
    };
};
