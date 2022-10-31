import { Request, Response } from "express";
import { PermissionRepository } from "../../domain/repositories/permission-repository";
import { CreatePermissionUsecase } from "../../domain/usecases/permissions/create-permission-usecase";

class PermissionController {
    async createRole(request: Request, response: Response) {
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
}

export { PermissionController }