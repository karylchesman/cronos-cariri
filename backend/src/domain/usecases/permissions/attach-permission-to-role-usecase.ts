import { RolePermission, RolePermissionProps } from "../../entities/role-permission";
import { PermissionRepositoryProtocol } from "../../repositories/interfaces/permission-repository-protocol";
import { RolePermissionRepositoryProtocol } from "../../repositories/interfaces/role-permission-repository-protocol";
import { RoleRepositoryProtocol } from "../../repositories/interfaces/role-repository-protocol";
import { isArray, isEmpty } from "../../utils/validators";

export interface IAttachPermissionToRoleUsecaseResquest {
    role_id: string;
    permissions_ids: string[];
}

export type IAttachPermissionToRoleUsecaseResponse = RolePermissionProps[];

class AttachPermissionToRoleUsecase {
    constructor(
        private roleRepository: RoleRepositoryProtocol,
        private permissionRepository: PermissionRepositoryProtocol,
        private rolePermissionRepository: RolePermissionRepositoryProtocol,
    ) { }

    async execute({ role_id, permissions_ids }: IAttachPermissionToRoleUsecaseResquest): Promise<IAttachPermissionToRoleUsecaseResponse> {
        isEmpty(role_id, "Perfil de acesso não definido.");
        isArray(permissions_ids, "Lista de permissões de acesso inválida.");

        const roleExists = await this.roleRepository.findById(role_id);

        if (!roleExists) {
            throw new Error("Perfil inválido ou não encontrado.");
        }

        const rolePermissionsOfRole = await this.rolePermissionRepository.find({
            role_id,
        });

        let permissionsIdsOfRole = rolePermissionsOfRole.map(item => item.permission_id);

        let permissionsIdsToAttach = permissions_ids.filter(item => {
            if (!permissionsIdsOfRole.includes(item)) {
                return item;
            }
        })

        let rolePermissionsIdsToDetach = rolePermissionsOfRole.filter(item => {
            if ((!permissions_ids.includes(item.permission_id)) && item.id !== undefined) {
                return true;
            }
        }).map(item => item.id || "");

        const rolePermissionsToCreate: RolePermissionProps[] = [];

        for await (let permission_id of permissionsIdsToAttach) {
            const permissionExists = await this.permissionRepository.findById(permission_id);

            if (!permissionExists) throw new Error("Uma das permissões não foi encontrada ou é inválida.");

            const new_role_permission = new RolePermission({ role_id, permission_id });
            new_role_permission.validate();

            rolePermissionsToCreate.push(new_role_permission.getProps());
        }

        const rolePermissionsCreated = await this.rolePermissionRepository.store({
            role_permissions_to_attach: rolePermissionsToCreate,
            role_permissions_ids_to_detach: rolePermissionsIdsToDetach
        })

        return rolePermissionsCreated;
    }
}

export { AttachPermissionToRoleUsecase }