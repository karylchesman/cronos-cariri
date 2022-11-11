import { PersonProps } from "../../entities/person";
import { UserProps } from "../../entities/user";
import { ISearchObject } from "../../utils/search-object";
import { PrefixKeys } from "../../utils/types/utilities";

export type TUserSearchProps = PrefixKeys<PersonProps, "person"> & Omit<UserProps, "person_id" | "person" | "permissions" | "roles" | "password">

export type TUserOrderByFields = keyof TUserSearchProps;

interface UserRepositoryProtocol {
    save: (user: UserProps) => Promise<UserProps>;
    update: (user: UserProps) => Promise<UserProps>;
    find: (user?: Partial<UserProps>) => Promise<UserProps[]>;
    search: (
        search_params?: ISearchObject<TUserSearchProps>[] | string,
        page?: number,
        limit?: number,
        order_by?: TUserOrderByFields,
        order?: "ASC" | "DESC"
    ) => Promise<{ users: UserProps[], registers: number }>;
    findById: (id: string) => Promise<UserProps | null>;
    deleteById: (id: string) => Promise<void>;
}

export { UserRepositoryProtocol }