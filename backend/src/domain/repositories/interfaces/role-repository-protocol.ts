import { RoleProps } from "../../entities/role.ts";
import { SearchObject } from "../../utils/search-object";

export type TRoleOrderByFields = keyof RoleProps;

interface RoleRepositoryProtocol {
    save: (role: RoleProps) => Promise<RoleProps>;
    update: (role: RoleProps) => Promise<RoleProps>;
    find: (role?: Partial<RoleProps>) => Promise<RoleProps[]>;
    search: (
        search_params?: SearchObject<RoleProps>[] | string,
        page?: number,
        limit?: number,
        order_by?: TRoleOrderByFields,
        order?: "ASC" | "DESC"
    ) => Promise<{ roles: RoleProps[], registers: number }>;
    findById: (id: string) => Promise<RoleProps | null>;
    deleteById: (id: string) => Promise<void>;
}

export { RoleRepositoryProtocol }