import { RolePermissionProps } from "../../entities/role-permission";

export type TRolePermissionStoreParams = {
    role_permissions_to_attach: RolePermissionProps[];
    role_permissions_ids_to_detach: string[];
}

interface RolePermissionRepositoryProtocol {
    store: ({ role_permissions_to_attach, role_permissions_ids_to_detach }: TRolePermissionStoreParams) => Promise<RolePermissionProps[]>;
    find: (role_permission?: Partial<RolePermissionProps>) => Promise<RolePermissionProps[]>;
    findById: (id: string) => Promise<RolePermissionProps | null>;
}

export { RolePermissionRepositoryProtocol }