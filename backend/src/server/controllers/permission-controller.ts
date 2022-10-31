import { Request, Response } from "express";
import { PermissionRepository } from "../../domain/repositories/permission-repository";
import { RolePermissionRepository } from "../../domain/repositories/role-permission-repository";
import { RoleRepository } from "../../domain/repositories/role-repository";
import { CreatePermissionUsecase } from "../../domain/usecases/permissions/create-permission-usecase";
import { SearchPermissionUsecase } from "../../domain/usecases/permissions/search-permission-usecase";
import { UpdatePermissionUsecase } from "../../domain/usecases/permissions/update-permission-usecase";
import { AttachPermissionToRoleUsecase } from "../../domain/usecases/roles/attach-permission-to-role-usecase";

class PermissionController {
    async createPermission(request: Request, response: Response) {
        const {
            name,
            identifier
        } = request.body;

        const permissionRepository = new PermissionRepository();
        const createPermissionUsecase = new CreatePermissionUsecase(permissionRepository);

        const new_permission = await createPermissionUsecase.execute({
            permission: {
                name,
                identifier
            }
        })

        return response.json(new_permission);
    }

    async search(request: Request, response: Response) {
        const {
            search_params,
            order_by,
            order
        } = request.body;
        const {
            page,
            limit
        } = request.query;

        const permissionRepository = new PermissionRepository();
        const searchPermissionUsecase = new SearchPermissionUsecase(permissionRepository);

        let has_page = Number(page);
        let has_limit = Number(limit);

        const permissions = await searchPermissionUsecase.execute({
            search_params,
            page: Number.isNaN(has_page) ? undefined : has_page,
            limit: Number.isNaN(has_limit) ? undefined : has_limit,
            order_by,
            order
        })

        return response.json(permissions);
    }

    async updatePermission(request: Request, response: Response) {
        const {
            id,
            name,
            identifier
        } = request.body;

        const permissionRepository = new PermissionRepository();
        const updatePermissionUsecase = new UpdatePermissionUsecase(permissionRepository);

        const permission_updated = await updatePermissionUsecase.execute({
            permission: {
                id,
                name,
                identifier
            }
        })

        return response.json(permission_updated);
    }

    async attachPermissionToRole(request: Request, response: Response) {
        const {
            role_id,
            permissions_ids
        } = request.body;

        const roleRepository = new RoleRepository();
        const permissionRepository = new PermissionRepository();
        const rolePermissionRoleRepository = new RolePermissionRepository();

        const attachRoleToUserUseCase = new AttachPermissionToRoleUsecase(roleRepository, permissionRepository, rolePermissionRoleRepository);

        const role_permissions = await attachRoleToUserUseCase.execute({
            role_id,
            permissions_ids
        })

        return response.json(role_permissions);
    }
}

export { PermissionController }