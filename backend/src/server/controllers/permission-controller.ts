import { Request, Response } from "express";
import { PermissionRepository } from "../../domain/repositories/permission-repository";
import { CreatePermissionUsecase } from "../../domain/usecases/permissions/create-permission-usecase";
import { SearchPermissionUsecase } from "../../domain/usecases/permissions/search-permission-usecase";

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
}

export { PermissionController }