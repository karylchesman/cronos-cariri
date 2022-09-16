import { User } from "../../entities/user";

interface UserRepositoryProtocol {
    save: (user: User) => Promise<User>;
    find: (user: Partial<User>) => Promise<User[]>;
    findWithPagination: (user: Partial<User>, page: number, limit: number) => Promise<User[]>;
    findById: (id: string) => Promise<User>;
    deleteById: (id: string) => Promise<void>;
}

export { UserRepositoryProtocol }