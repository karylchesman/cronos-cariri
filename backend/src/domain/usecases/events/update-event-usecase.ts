import { EEventTypes, Event, EventProps } from "../../entities/event";
import { EventRepositoryProtocol } from "../../repositories/interfaces/event-repository-protocol";
import { normalizeString } from "../../utils/normalize-string";
import { isString } from "../../utils/validators";

export interface IUpdateEventUsecaseResquest {
    event: {
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
    }
}

export type IUpdateEventUsecaseResponse = EventProps;

class UpdateEventUsecase {
    constructor(
        private eventRepository: EventRepositoryProtocol
    ) { }

    async execute({ event }: IUpdateEventUsecaseResquest): Promise<IUpdateEventUsecaseResponse> {

        isString(event.name, "Nome do evento inválido.");
        isString(event.id, "Evento inválido.");

        const eventToEdit = await this.eventRepository.findById(event.id);

        if (!eventToEdit) {
            throw new Error("Evento não encontrado.");
        }

        if (event.name !== eventToEdit.name) {
            const [eventNameExists] = await this.eventRepository.find({
                name: event.name
            })

            if (eventNameExists) {
                throw new Error("Já existe um evento com esse nome, por favor tente outro.");
            }

            eventToEdit.url_path = normalizeString(event.name);

            const urlPathExists = await this.eventRepository.findByUrlPath(eventToEdit.url_path, true)

            if (urlPathExists && urlPathExists.length > 0) {
                eventToEdit.url_path += `_${String(urlPathExists.length)}`;
            }
        }

        const updated_data = new Event(Object.assign(eventToEdit, { ...event }));

        updated_data.validate();

        const updated_event = await this.eventRepository.save(updated_data.getProps());

        return updated_event;
    }
}

export { UpdateEventUsecase }