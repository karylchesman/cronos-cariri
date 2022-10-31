import { PermissionProps } from "../../entities/permission";
import { SearchObject } from "../../utils/search-object";

export type TPermissionOrderByFields = keyof PermissionProps;

interface PermissionRepositoryProtocol {
    save: (permission: PermissionProps) => Promise<PermissionProps>;
    update: (permission: PermissionProps) => Promise<PermissionProps>;
    find: (permission?: Partial<PermissionProps>) => Promise<PermissionProps[]>;
    search: (
        search_params?: SearchObject<PermissionProps>[] | string,
        page?: number,
        limit?: number,
        order_by?: TPermissionOrderByFields,
        order?: "ASC" | "DESC"
    ) => Promise<{ permissions: PermissionProps[], registers: number }>;
    findById: (id: string) => Promise<PermissionProps | null>;
    findByIdList: (ids: string[]) => Promise<PermissionProps[]>;
    deleteById: (id: string) => Promise<void>;
}

export { PermissionRepositoryProtocol }