import { Request, Response } from "express";
import { RoleRepository } from "../../domain/repositories/role-repository";
import { CreateRoleUsecase } from "../../domain/usecases/roles/create-role-usecase";
import { SearchRoleUsecase } from "../../domain/usecases/roles/search-role-usecase";

class RoleController {
    async createRole(request: Request, response: Response) {
        const {
            name
        } = request.body;

        const roleRepository = new RoleRepository();
        const createRoleUsecase = new CreateRoleUsecase(roleRepository);

        const new_role = await createRoleUsecase.execute({
            role: {
                name
            }
        })

        return response.json(new_role);
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

        const roleRepository = new RoleRepository();
        const searchRoleUsecase = new SearchRoleUsecase(roleRepository);

        let has_page = Number(page);
        let has_limit = Number(limit);

        const roles = await searchRoleUsecase.execute({
            search_params,
            page: Number.isNaN(has_page) ? undefined : has_page,
            limit: Number.isNaN(has_limit) ? undefined : has_limit,
            order_by,
            order
        })

        return response.json(roles);
    }
}

export { RoleController }