import { PermissionProps } from "../../entities/permission";
import { RoleProps } from "../../entities/role";
import { PermissionRepositoryProtocol } from "../../repositories/interfaces/permission-repository-protocol";
import { RoleRepositoryProtocol } from "../../repositories/interfaces/role-repository-protocol";
import { UserRoleRepositoryProtocol } from "../../repositories/interfaces/user-role-repository-protocol";
import { RolePermissionRepository } from "../../repositories/role-permission-repository";

export type IGetUserRolesAndPermissionsUsecaseRequest = {
    user_id: string;
};

export type IGetUserRolesAndPermissionsUsecaseResponse = {
    roles: RoleProps[],
    permissions: PermissionProps[]
}
class GetUserRolesAndPermissionsUsecase {
    constructor(
        private userRoleRepository: UserRoleRepositoryProtocol,
        private roleRepository: RoleRepositoryProtocol,
        private rolePermissionsRepository: RolePermissionRepository,
        private permissionsRepository: PermissionRepositoryProtocol,
    ) { }

    async execute({ user_id }: IGetUserRolesAndPermissionsUsecaseRequest): Promise<IGetUserRolesAndPermissionsUsecaseResponse> {
        const user_roles = await this.userRoleRepository.find({
            user_id
        })

        const roles_ids = user_roles.map(item => item.role_id);

        const roles = await this.roleRepository.findByIdList(roles_ids);

        const role_permissions = await this.rolePermissionsRepository.findByRoleIdList(roles_ids);

        const permissions = await this.permissionsRepository.findByIdList(role_permissions.map(item => item.permission_id));

        return {
            roles,
            permissions
        };
    }
}

export { GetUserRolesAndPermissionsUsecase }