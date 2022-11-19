export enum EEventTypes {
    "MTB" = "MTB",
    "Trail" = "Trail",
    "Corrida de Rua" = "Corrida de Rua"
}

export enum EEventStatus {
    "Publicado" = "Publicado",
    "Não Publicado" = "Não Publicado",
    "Cancelado" = "Cancelado",
}

export enum EEventResultTypes {
    "Importação" = "Importação",
    "Integração" = "Integração",
    "PDF" = "PDF",
}

export interface IEvent {
    id: string;
    name: string;
    event_date: Date;
    event_time: string;
    address_street: string;
    address_number: string;
    address_district: string;
    address_city: string;
    address_uf: string;
    address_cep: string;
    email: string;
    phonenumber?: string;
    event_type: EEventTypes;
    inscription_limit_date: Date;
    url_path: string;
    status: EEventStatus;
    banner_archive_id?: string;
    card_archive_id?: string;
    result_type?: EEventResultTypes;
    details?: string;
    created_at: Date;
    updated_at: Date;
}

export interface IEventsContext {
    events: IEvent[];
    selected: {
        event: IEvent | null;
    };
}

export type TEventsActions = { type: "events/set", payload: IEvent[] }
    | { type: "events/select/set-event", payload: IEvent }
    | { type: "events/reset-selected" }


export const eventsInitialState: IEventsContext = {
    events: [],
    selected: {
        event: null
    },
}

export function eventsReducer(state: IEventsContext, action: TEventsActions) {
    switch (action.type) {
        case "events/set":
            return { ...state, events: action.payload }
        case "events/select/set-event":
            return { ...state, selected: { event: action.payload } }
        case "events/reset-selected":
            return { ...state, selected: { event: null } }
        default:
            return state
    }
}