import { UserProps } from "../../entities/user";
import { TUserOrderByFields, UserRepositoryProtocol } from "../../repositories/interfaces/user-repository-protocol";
import { ISearchObject, isValidSearchKey, isValidSearchOperator, isValidSearchValue } from "../../utils/search-object";

export type ISearchUserUsecaseRequest = {
    search_params?: ISearchObject<UserProps>[] | string;
    page?: number;
    limit?: number;
    order_by?: TUserOrderByFields;
    order?: "ASC" | "DESC";
};

export type ISearchUserUsecaseResponse = {
    users: UserProps[];
    registers: number;
};

class SearchUserUsecase {
    constructor(private userRepository: UserRepositoryProtocol) { }

    async execute({ search_params, limit, page, order, order_by }: ISearchUserUsecaseRequest): Promise<ISearchUserUsecaseResponse> {
        if (order_by) {
            if (order !== "ASC" && order !== "DESC") throw new Error("Defina uma ordem para a chave de ordenação selecionada.");
        }

        if(Array.isArray(search_params)){
            search_params.forEach(item =>{
                isValidSearchKey(item.key, [
                    "name",
                    "email",
                    "person:cpf"
                ])
                isValidSearchValue(item.value)
                isValidSearchOperator(item.operator)
            })
        }

        const usersFound = await this.userRepository.search(search_params, page, limit, order_by, order);

        usersFound.users.forEach(item => Reflect.deleteProperty(item, "password"))

        return usersFound;
    }
}

export { SearchUserUsecase }