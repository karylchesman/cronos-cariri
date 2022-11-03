import { PermissionProps } from "../../entities/permission";
import { RoleProps } from "../../entities/role";
import { PermissionRepositoryProtocol } from "../../repositories/interfaces/permission-repository-protocol";
import { RoleRepositoryProtocol } from "../../repositories/interfaces/role-repository-protocol";
import { UserRoleRepositoryProtocol } from "../../repositories/interfaces/user-role-repository-protocol";
import { RolePermissionRepository } from "../../repositories/role-permission-repository";

export type IGetPermissionsByRoleUsecaseRequest = {
    role_id: string;
};

export type IGetPermissionsByRoleUsecaseResponse = PermissionProps[];

class GetPermissionsByRoleUsecase {
    constructor(
        private roleRepository: RoleRepositoryProtocol,
        private rolePermissionsRepository: RolePermissionRepository,
        private permissionsRepository: PermissionRepositoryProtocol,
    ) { }

    async execute({ role_id }: IGetPermissionsByRoleUsecaseRequest): Promise<IGetPermissionsByRoleUsecaseResponse> {
        const roleExists = await this.roleRepository.findById(role_id);

        if (!roleExists) {
            throw new Error("Perfil de acesso não encontrado.");
        }

        const role_permissions = await this.rolePermissionsRepository.findByRoleIdList([String(roleExists.id)]);

        const permissions = await this.permissionsRepository.findByIdList(role_permissions.map(item => item.permission_id));

        return permissions;
    }
}

export { GetPermissionsByRoleUsecase }