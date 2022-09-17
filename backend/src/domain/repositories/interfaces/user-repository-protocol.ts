import { UserProps } from "../../entities/user";
import { SearchObject } from "../../utils/search-object";

interface UserRepositoryProtocol {
    save: (user: UserProps) => Promise<UserProps>;
    update: (user: UserProps) => Promise<UserProps>;
    find: (user?: Partial<UserProps>) => Promise<UserProps[]>;
    search: (search_params?: SearchObject<UserProps>[], page?: number, limit?: number) => Promise<{ users: UserProps[], registers: number }>;
    findById: (id: string) => Promise<UserProps | null>;
    deleteById: (id: string) => Promise<void>;
}

export { UserRepositoryProtocol }