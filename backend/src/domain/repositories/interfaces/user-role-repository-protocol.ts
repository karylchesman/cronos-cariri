import { UserRoleProps } from "../../entities/user-role";

export type TUserRoleOrderByFields = keyof UserRoleProps;

export type TUserRolesStoreParams = {
    user_roles_to_attach: UserRoleProps[];
    user_roles_ids_to_detach: string[];
}

interface UserRoleRepositoryProtocol {
    store: ({ user_roles_to_attach, user_roles_ids_to_detach }: TUserRolesStoreParams) => Promise<UserRoleProps[]>;
    find: (user_role?: Partial<UserRoleProps>) => Promise<UserRoleProps[]>;
    findById: (id: string) => Promise<UserRoleProps | null>;
}

export { UserRoleRepositoryProtocol }