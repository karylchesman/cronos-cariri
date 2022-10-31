import { In, Repository } from "typeorm";
import { AppDataSource } from "../../infra/typeORM/connection";
import { ORMRolePermission } from "../../infra/typeORM/entities/ORMRolePermission";
import { RolePermissionProps } from "../entities/role-permission";
import { RolePermissionRepositoryProtocol, TRolePermissionStoreParams } from "./interfaces/role-permission-repository-protocol";

class RolePermissionRepository implements RolePermissionRepositoryProtocol {
    private rolePermissionRepository: Repository<ORMRolePermission>;

    constructor() {
        this.rolePermissionRepository = AppDataSource.getRepository(ORMRolePermission);
    }

    async store({ role_permissions_to_attach, role_permissions_ids_to_detach }: TRolePermissionStoreParams): Promise<RolePermissionProps[]> {
        const result = this.rolePermissionRepository.manager.transaction(async (transactionManager) => {
            const role_permission_to_save = transactionManager.create(ORMRolePermission, role_permissions_to_attach);

            const created = await transactionManager.save(ORMRolePermission, role_permission_to_save);

            await transactionManager.delete(ORMRolePermission, { id: In(role_permissions_ids_to_detach) });

            return created;
        })

        return result;
    }

    async find(role_permission?: Partial<RolePermissionProps>) {

        const found_role_permissions = await this.rolePermissionRepository.find({
            where: role_permission
        })

        return found_role_permissions;
    }

    async findById(id: string) {
        const role_permission = await this.rolePermissionRepository.findOne({
            where: {
                id
            }
        })

        if (role_permission) {
            return role_permission;
        }

        return null;
    }
}

export { RolePermissionRepository }