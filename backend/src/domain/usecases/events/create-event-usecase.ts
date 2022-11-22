import { EEventTypes, Event, EventProps } from "../../entities/event";
import { EventRepositoryProtocol } from "../../repositories/interfaces/event-repository-protocol";
import { normalizeString } from "../../utils/normalize-string";
import { isString } from "../../utils/validators";

export interface ICreateEventUsecaseResquest {
    event: {
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
    }
}

export type ICreateEventUsecaseResponse = EventProps;

class CreateEventUsecase {
    constructor(
        private eventRepository: EventRepositoryProtocol
    ) { }

    async execute({ event }: ICreateEventUsecaseResquest): Promise<ICreateEventUsecaseResponse> {

        isString(event.name, "Nome do evento inválido.");

        const [eventExists] = await this.eventRepository.find({
            name: event.name
        })
        
        if (eventExists) {
            throw new Error("Já existe um evento com esse nome, por favor tente outro.");
        }

        let url_path = normalizeString(event.name);

        const urlPathExists = await this.eventRepository.findByUrlPath(url_path, true)

        if (urlPathExists && urlPathExists.length > 0) {
            url_path += `_${String(urlPathExists.length)}`;
        }

        const new_event = new Event({ ...event, url_path });

        new_event.validate();

        const saved_event = await this.eventRepository.save(new_event.getProps());

        return saved_event;
    }
}

export { CreateEventUsecase }