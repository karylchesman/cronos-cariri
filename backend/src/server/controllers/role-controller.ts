import { Request, Response } from "express";
import { RoleRepository } from "../../domain/repositories/role-repository";
import { UserRepository } from "../../domain/repositories/user-repository";
import { UserRoleRepository } from "../../domain/repositories/user-role-repository";
import { AttachRoleToUserUsecase } from "../../domain/usecases/roles/attach-role-to-user-usecase";
import { CreateRoleUsecase } from "../../domain/usecases/roles/create-role-usecase";
import { SearchRoleUsecase } from "../../domain/usecases/roles/search-role-usecase";
import { isArray, isEmpty } from "../../domain/utils/validators";

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

    async attachRoleToUser(request: Request, response: Response) {
        const {
            user_id,
            roles_ids
        } = request.body;

        isEmpty(user_id, "Usuário não definido.");
        isArray(roles_ids, "Lista de perfis de acesso inválida.");

        const roleRepository = new RoleRepository();
        const userRepository = new UserRepository();
        const userRoleRepository = new UserRoleRepository();

        const attachRoleToUserUseCase = new AttachRoleToUserUsecase(roleRepository, userRepository, userRoleRepository);

        const user_roles = await attachRoleToUserUseCase.execute({
            user_id,
            roles_ids
        })

        return response.json(user_roles);
    }
}

export { RoleController }