import { UserProps } from "../../entities/user";
import { ISearchObject } from "../../utils/search-object";

export type TUserOrderByFields = keyof Omit<UserProps, "person_id" | "person" | "permissions" | "roles">;

interface UserRepositoryProtocol {
    save: (user: UserProps) => Promise<UserProps>;
    update: (user: UserProps) => Promise<UserProps>;
    find: (user?: Partial<UserProps>) => Promise<UserProps[]>;
    search: (
        search_params?: ISearchObject<UserProps>[] | string,
        page?: number,
        limit?: number,
        order_by?: TUserOrderByFields,
        order?: "ASC" | "DESC"
    ) => Promise<{ users: UserProps[], registers: number }>;
    findById: (id: string) => Promise<UserProps | null>;
    deleteById: (id: string) => Promise<void>;
}

export { UserRepositoryProtocol }