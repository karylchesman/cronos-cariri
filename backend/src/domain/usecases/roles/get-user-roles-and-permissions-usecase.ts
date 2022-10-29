import { PermssionProps } from "../../entities/permission";
import { RoleProps } from "../../entities/role.ts";
import { RoleRepositoryProtocol } from "../../repositories/interfaces/role-repository-protocol";
import { UserRoleRepositoryProtocol } from "../../repositories/interfaces/user-role-repository-protocol";

export type IGetUserRolesAndPermissionsUsecaseRequest = {
    user_id: string;
};

export type IGetUserRolesAndPermissionsUsecaseResponse = {
    roles: RoleProps[],
    permissions: PermssionProps[]
}
class GetUserRolesAndPermissionsUsecase {
    constructor(
        private userRoleRepository: UserRoleRepositoryProtocol,
        private roleRepository: RoleRepositoryProtocol
    ) { }

    async execute({ user_id }: IGetUserRolesAndPermissionsUsecaseRequest): Promise<IGetUserRolesAndPermissionsUsecaseResponse> {
        const user_roles = await this.userRoleRepository.find({
            user_id
        })

        const roles = await this.roleRepository.findByIdList(user_roles.map(item => item.role_id));

        return {
            roles,
            permissions: []
        };
    }
}

export { GetUserRolesAndPermissionsUsecase }