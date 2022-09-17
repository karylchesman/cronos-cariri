import { UserProps } from "../../entities/user";
import { UserRepositoryProtocol } from "../../repositories/interfaces/user-repository-protocol";
import { SearchObject } from "../../utils/search-object";

export type ISearchUserUsecaseRequest = {
    search_params?: SearchObject<UserProps>[];
    page?: number;
    limit?: number;
};

export type ISearchUserUsecaseResponse = {
    users: UserProps[];
    registers: number;
};

class SearchUserUsecase {
    constructor(private userRepository: UserRepositoryProtocol) { }

    async execute({ search_params, limit, page }: ISearchUserUsecaseRequest): Promise<ISearchUserUsecaseResponse> {

        const usersFound = await this.userRepository.search(search_params, page, limit);

        usersFound.users.forEach(item => Reflect.deleteProperty(item, "password"))

        return usersFound;
    }
}

export { SearchUserUsecase }