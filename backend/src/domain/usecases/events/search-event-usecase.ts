import { EventProps } from "../../entities/event";
import { EventRepositoryProtocol, TEventOrderByFields } from "../../repositories/interfaces/event-repository-protocol";
import { ISearchObject, isValidSearchKey, isValidSearchOperator, isValidSearchValue } from "../../utils/search-object";

export type ISearchEventUsecaseRequest = {
    search_params?: ISearchObject<EventProps>[] | string;
    page?: number;
    limit?: number;
    order_by?: TEventOrderByFields;
    order?: "ASC" | "DESC";
};

export type ISearchEventUsecaseResponse = {
    events: EventProps[];
    registers: number;
};

class SearchEventUsecase {
    constructor(private eventRepository: EventRepositoryProtocol) { }

    async execute({ search_params, limit, page, order, order_by }: ISearchEventUsecaseRequest): Promise<ISearchEventUsecaseResponse> {
        if (order_by) {
            if (order !== "ASC" && order !== "DESC") throw new Error("Defina uma ordem para a chave de ordenação selecionada.");
        }

        if (Array.isArray(search_params)) {
            search_params.forEach(item => {
                isValidSearchKey(item.key, [
                    "name",
                    "event_date",
                    "event_time",
                    "address_street",
                    "address_number",
                    "address_district",
                    "address_city",
                    "address_uf",
                    "address_cep",
                    "email",
                    "phonenumber",
                    "event_type",
                    "inscription_limit_date",
                    "url_path",
                    "status",
                    "result_type"
                ])
                isValidSearchValue(item.value)
                isValidSearchOperator(item.operator)
            })
        }

        const events = await this.eventRepository.search(search_params, page, limit, order_by, order);

        return events;
    }
}

export { SearchEventUsecase }