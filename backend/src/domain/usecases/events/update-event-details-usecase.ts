import { Event } from "../../entities/event";
import { EventRepositoryProtocol } from "../../repositories/interfaces/event-repository-protocol";
import { isString } from "../../utils/validators";

export interface IUpdateEventUsecaseResquest {
    event_id: string;
    details: string;
}

export type IUpdateEventUsecaseResponse = void;

class UpdateEventDetailsUsecase {
    constructor(
        private eventRepository: EventRepositoryProtocol
    ) { }

    async execute({ event_id, details }: IUpdateEventUsecaseResquest): Promise<IUpdateEventUsecaseResponse> {

        isString(event_id, "Evento inválido.");
        isString(details, "Formato dos detalhes inválido.");

        const eventToEdit = await this.eventRepository.findById(event_id);

        if (!eventToEdit) {
            throw new Error("Evento não encontrado.");
        }

        const updated_data = new Event(Object.assign(eventToEdit, { details }));

        updated_data.validate();

        await this.eventRepository.update(updated_data.getProps());

        return;
    }
}

export { UpdateEventDetailsUsecase }