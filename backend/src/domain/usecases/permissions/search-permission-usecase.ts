import { PermissionProps } from "../../entities/permission";
import { PermissionRepositoryProtocol, TPermissionOrderByFields } from "../../repositories/interfaces/permission-repository-protocol";
import { ISearchObject } from "../../utils/search-object";

export type ISearchPermissionUsecaseRequest = {
    search_params?: ISearchObject<PermissionProps>[] | string;
    page?: number;
    limit?: number;
    order_by?: TPermissionOrderByFields;
    order?: "ASC" | "DESC";
};

export type ISearchPermissionUsecaseResponse = {
    permissions: PermissionProps[];
    registers: number;
};

class SearchPermissionUsecase {
    constructor(private permissionRepository: PermissionRepositoryProtocol) { }

    async execute({ search_params, limit, page, order, order_by }: ISearchPermissionUsecaseRequest): Promise<ISearchPermissionUsecaseResponse> {
        if (order_by) {
            if (order !== "ASC" && order !== "DESC") throw new Error("Defina uma ordem para a chave de ordenação selecionada.");
        }

        const permissions = await this.permissionRepository.search(search_params, page, limit, order_by, order);

        return permissions;
    }
}

export { SearchPermissionUsecase }