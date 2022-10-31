import { RoleProps } from "../../entities/role";
import { RoleRepositoryProtocol, TRoleOrderByFields } from "../../repositories/interfaces/role-repository-protocol";
import { SearchObject } from "../../utils/search-object";

export type ISearchRoleUsecaseRequest = {
    search_params?: SearchObject<RoleProps>[] | string;
    page?: number;
    limit?: number;
    order_by?: TRoleOrderByFields;
    order?: "ASC" | "DESC";
};

export type ISearchRoleUsecaseResponse = {
    roles: RoleProps[];
    registers: number;
};

class SearchRoleUsecase {
    constructor(private roleRepository: RoleRepositoryProtocol) { }

    async execute({ search_params, limit, page, order, order_by }: ISearchRoleUsecaseRequest): Promise<ISearchRoleUsecaseResponse> {
        if (order_by) {
            if (order !== "ASC" && order !== "DESC") throw new Error("Defina uma ordem para a chave de ordenação selecionada.");
        }

        const roles = await this.roleRepository.search(search_params, page, limit, order_by, order);

        return roles;
    }
}

export { SearchRoleUsecase }