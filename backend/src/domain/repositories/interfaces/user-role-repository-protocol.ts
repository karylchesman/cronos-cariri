import { UserRoleProps } from "../../entities/user-role";

export type TUserRoleOrderByFields = keyof UserRoleProps;

interface UserRoleRepositoryProtocol {
    save: (user_role: UserRoleProps) => Promise<UserRoleProps>;
    update: (user_role: UserRoleProps) => Promise<UserRoleProps>;
    find: (user_role?: Partial<UserRoleProps>) => Promise<UserRoleProps[]>;
    findById: (id: string) => Promise<UserRoleProps | null>;
    deleteById: (id: string) => Promise<void>;
}

export { UserRoleRepositoryProtocol }