import { Request, Response } from "express";
import { PersonRepository } from "../../domain/repositories/person-repository";
import { RoleRepository } from "../../domain/repositories/role-repository";
import { UserRepository } from "../../domain/repositories/user-repository";
import { UserRoleRepository } from "../../domain/repositories/user-role-repository";
import { GetPersonUsecase } from "../../domain/usecases/persons/get-person-usecase";
import { GetUserRolesAndPermissionsUsecase } from "../../domain/usecases/roles/get-user-roles-and-permissions-usecase";
import { AuthenticateUserUsecase } from "../../domain/usecases/users/authenticate-user-usecase";
import { CreateUserUsecase } from "../../domain/usecases/users/create-user-usecase";
import { DeleteUserUsecase } from "../../domain/usecases/users/delete-user-usecase";
import { GetUserUsecase } from "../../domain/usecases/users/get-user-usecase";
import { SearchUserUsecase } from "../../domain/usecases/users/search-user-usecase";
import { UpdateUserUsecase } from "../../domain/usecases/users/update-user-usecase";

class UserController {
    async createUser(request: Request, response: Response) {
        const {
            email,
            name,
            password,
            token_user_id
        } = request.body;

        const userRepository = new UserRepository();
        const personRepository = new PersonRepository();
        const createUserUsecase = new CreateUserUsecase(userRepository, personRepository);

        const new_user = await createUserUsecase.execute({
            userIdRequested: token_user_id,
            user: {
                email,
                name,
                password
            }
        })

        return response.json(new_user);
    }

    async registerUser(request: Request, response: Response) {
        const {
            email,
            name,
            password,
            phonenumber1,
            gender,
            cpf,
            bith_date,
            address_street,
            address_number,
            address_district,
            address_city,
            address_uf,
            address_cep
        } = request.body;

        const userRepository = new UserRepository();
        const personRepository = new PersonRepository();
        const createUserUsecase = new CreateUserUsecase(userRepository, personRepository);

        const new_user = await createUserUsecase.execute({
            user: {
                email,
                name,
                password,
                person: {
                    phonenumber1,
                    gender,
                    cpf,
                    bith_date,
                    address_street,
                    address_number,
                    address_district,
                    address_city,
                    address_uf,
                    address_cep
                }
            }
        })

        return response.json(new_user);
    }

    async updateUser(request: Request, response: Response) {
        const {
            id,
            email,
            name,
            password,
            role,
            token_user_id
        } = request.body;

        const userRepository = new UserRepository();
        const personRepository = new PersonRepository();

        const getUserUsecase = new GetUserUsecase(userRepository, personRepository);
        const userLogged = await getUserUsecase.execute(token_user_id);

        const updateUserUsecase = new UpdateUserUsecase(userLogged, userRepository);
        const updated_user = await updateUserUsecase.execute({
            id,
            email,
            name,
            password
        })

        return response.json(updated_user);
    }

    async getUserById(request: Request, response: Response) {
        const {
            id
        } = request.params;

        const userRepository = new UserRepository();
        const personRepository = new PersonRepository();
        const getUserUsecase = new GetUserUsecase(userRepository, personRepository);

        const user = await getUserUsecase.execute(id)

        return response.json(user);
    }

    async getLoggedUser(request: Request, response: Response) {
        const {
            token_user_id
        } = request.body;

        const userRepository = new UserRepository();
        const personRepository = new PersonRepository();
        const getUserUsecase = new GetUserUsecase(userRepository, personRepository);

        const user = await getUserUsecase.execute(token_user_id);

        const roleRepository = new RoleRepository();
        const userRoleRepository = new UserRoleRepository();

        const getUserRolesAndPermissionsUsecase = new GetUserRolesAndPermissionsUsecase(userRoleRepository, roleRepository);

        const roles_and_permissions = await getUserRolesAndPermissionsUsecase.execute({ user_id: String(user.id) })

        user.roles = roles_and_permissions.roles
        user.permissions = roles_and_permissions.permissions

        return response.json(user);
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

        const userRepository = new UserRepository();
        const searchUserUsecase = new SearchUserUsecase(userRepository);

        let has_page = Number(page);
        let has_limit = Number(limit);

        const users = await searchUserUsecase.execute({
            search_params,
            page: Number.isNaN(has_page) ? undefined : has_page,
            limit: Number.isNaN(has_limit) ? undefined : has_limit,
            order_by,
            order
        })

        return response.json(users);
    }

    async deleteUser(request: Request, response: Response) {
        const {
            id
        } = request.params;

        const userRepository = new UserRepository();
        const personRepository = new PersonRepository();
        const deleteUserUsecase = new DeleteUserUsecase(userRepository, personRepository);

        await deleteUserUsecase.execute(id)

        return response.json({ message: "Success" });
    }

    async getSession(request: Request, response: Response) {
        const {
            email,
            password
        } = request.body;

        const userRepository = new UserRepository();
        const authenticateUserUsecase = new AuthenticateUserUsecase(userRepository);

        const authResult = await authenticateUserUsecase.execute({ email, password });

        if (authResult.user.person_id) {
            const personRepository = new PersonRepository();
            const getPersonUsecase = new GetPersonUsecase(personRepository);

            const person_data = await getPersonUsecase.execute(authResult.user.person_id);

            authResult.user.person = person_data;
        }

        const roleRepository = new RoleRepository();
        const userRoleRepository = new UserRoleRepository();

        const getUserRolesAndPermissionsUsecase = new GetUserRolesAndPermissionsUsecase(userRoleRepository, roleRepository);

        const roles_and_permissions = await getUserRolesAndPermissionsUsecase.execute({ user_id: String(authResult.user.id) })

        authResult.user.roles = roles_and_permissions.roles
        authResult.user.permissions = roles_and_permissions.permissions

        return response.json(authResult);
    }
}

export { UserController }