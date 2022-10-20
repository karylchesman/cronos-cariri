import { EventProps } from "../../entities/event";
import { EventRepositoryProtocol, TEventOrderByFields } from "../../repositories/interfaces/event-repository-protocol";
import { SearchObject } from "../../utils/search-object";

export type ISearchEventUsecaseRequest = {
    search_params?: SearchObject<EventProps>[] | string;
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

        const events = await this.eventRepository.search(search_params, page, limit, order_by, order);

        return events;
    }
}

export { SearchEventUsecase }