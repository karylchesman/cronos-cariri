import { EventProps } from "../../entities/event";
import { SearchObject } from "../../utils/search-object";

export type TEventOrderByFields = keyof EventProps;

interface EventRepositoryProtocol {
    save: (event: EventProps) => Promise<EventProps>;
    update: (event: EventProps) => Promise<EventProps>;
    find: (event?: Partial<EventProps>) => Promise<EventProps[]>;
    search: (
        search_params?: SearchObject<EventProps>[] | string,
        page?: number,
        limit?: number,
        order_by?: TEventOrderByFields,
        order?: "ASC" | "DESC"
    ) => Promise<{ events: EventProps[], registers: number }>;
    findById: (id: string) => Promise<EventProps | null>;
    findByUrlPath: (url_path: string, search_like: boolean) => Promise<EventProps[] | null>;
    deleteById: (id: string) => Promise<void>;
}

export { EventRepositoryProtocol }