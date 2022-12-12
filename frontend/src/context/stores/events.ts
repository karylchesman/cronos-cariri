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

export enum EEventAttachmentTypes {
    "event_banner" = "event_banner",
    "event_card" = "event_card"
}

export interface IEventAttachment {
    id: string,
    event_id: string;
    attachment_type: EEventAttachmentTypes;
    filename: string;
    created_at: Date;
    updated_at: Date;
}

export enum EShowInscriptionListOption {
    "Mostrar" = "Mostrar",
    "Não Mostrar" = "Não Mostrar",
    "Somente Confirmadas" = "Somente Confirmadas"
}

export interface IEventParameters {
    id: string;
    event_id: string;
    inscription_made_email: boolean;
    inscription_confirmed_email: boolean;
    inscription_canceled_email: boolean;
    show_inscription_list: EShowInscriptionListOption;
    pagseguro_token: string;
    pagseguro_email: string;
    pagseguro_api_link: string;
}

export interface IEventsContext {
    events: IEvent[];
    selected: {
        event: IEvent | null;
        banner: IEventAttachment | null;
        card: IEventAttachment | null;
        parameters: IEventParameters | null;
    };
}

export type TEventsActions = { type: "events/set", payload: IEvent[] }
    | { type: "events/select/set-event", payload: IEvent }
    | { type: "events/select/set-banner", payload: IEventAttachment }
    | { type: "events/select/set-card", payload: IEventAttachment }
    | { type: "events/select/set-parameters", payload: IEventParameters }
    | { type: "events/reset-selected" }


export const eventsInitialState: IEventsContext = {
    events: [],
    selected: {
        event: null,
        banner: null,
        card: null,
        parameters: null
    },
}

export function eventsReducer(state: IEventsContext, action: TEventsActions) {
    switch (action.type) {
        case "events/set":
            return { ...state, events: action.payload }
        case "events/select/set-event":
            return { ...state, selected: { ...state.selected, event: action.payload } }
        case "events/select/set-banner":
            return { ...state, selected: { ...state.selected, banner: action.payload } }
        case "events/select/set-card":
            return { ...state, selected: { ...state.selected, card: action.payload } }
        case "events/select/set-parameters":
            return { ...state, selected: { ...state.selected, parameters: action.payload } }
        case "events/reset-selected":
            return { ...state, selected: { event: null, banner: null, card: null, parameters: null } }
        default:
            return state
    }
}