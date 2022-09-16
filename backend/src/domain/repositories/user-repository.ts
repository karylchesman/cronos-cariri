import { User } from "../entities/user";
import { UserRepositoryProtocol } from "./interfaces/user-repository-protocol";

class UserRepository implements UserRepositoryProtocol {
    async save(user: User): Promise<User> {


        return user;
    }

    async find(user: Partial<User>): Promise<User[]> {


        return [];
    }

    async findById(id: string): Promise<User> {

        return {} as User;
    }

    async findWithPagination(user: Partial<User>, page: number, limit: number): Promise<User[]> {
        return [];
    }

    async deleteById(id: string): Promise<void> {

        return;
    }

}

export { UserRepository }