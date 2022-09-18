import { Request, Response } from "express";
import { PersonRepository } from "../../domain/repositories/person-repository";
import { UserRepository } from "../../domain/repositories/user-repository";
import { GetPersonUsecase } from "../../domain/usecases/persons/get-person-usecase";
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
            role
        } = request.body;

        const userRepository = new UserRepository();
        const createUserUsecase = new CreateUserUsecase(userRepository);

        const new_user = await createUserUsecase.execute({
            email,
            name,
            password,
            role
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
            token_user
        } = request.body;

        const userRepository = new UserRepository();
        const personRepository = new PersonRepository();
        const createUserUsecase = new UpdateUserUsecase(token_user, userRepository, personRepository);

        const updated_user = await createUserUsecase.execute({
            id,
            email,
            name,
            password,
            role
        })

        return response.json(updated_user);
    }

    async getUserById(request: Request, response: Response) {
        const {
            id
        } = request.params;

        const userRepository = new UserRepository();
        const createUserUsecase = new GetUserUsecase(userRepository);

        const user = await createUserUsecase.execute(id)

        return response.json(user);
    }

    async search(request: Request, response: Response) {
        const { search_params } = request.body;
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
            limit: Number.isNaN(has_limit) ? undefined : has_limit
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

        return response.json(authResult);
    }
}

export { UserController }