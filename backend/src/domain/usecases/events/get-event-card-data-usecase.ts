import { EEventAttachmentTypes, EventAttachmentProps } from "../../entities/event-attachment";
import { EventAttachmentRepositoryProtocol } from "../../repositories/interfaces/event-attachment-repository-protocol";
import { EventRepositoryProtocol } from "../../repositories/interfaces/event-repository-protocol";
import { isString } from "../../utils/validators";

export type IGetEventCardDataUsecaseRequest = {
    event_id: string;
    card_archive_id: string;
};

export type IGetEventCardDataUsecaseResponse = {
    event_card: Exclude<EventAttachmentProps, "archive">;
};

class GetEventCardDataUsecase {
    constructor(
        private eventRepository: EventRepositoryProtocol,
        private eventAttachmentRepository: EventAttachmentRepositoryProtocol
    ) { }

    async execute({ event_id, card_archive_id }: IGetEventCardDataUsecaseRequest): Promise<IGetEventCardDataUsecaseResponse> {
        isString(event_id, "Evento inválida.");
        isString(card_archive_id, "ID do arquivo inválido.");

        const eventExits = await this.eventRepository.findById(event_id);

        if (!eventExits) {
            throw new Error("Evento não encontrado.");
        }

        const [event_card] = await this.eventAttachmentRepository.find({
            event_id: eventExits.id,
            id: card_archive_id,
            attachment_type: EEventAttachmentTypes["event_card"]
        });

        if (!event_card) {
            throw new Error("Capa não encontrada.");
        }

        Reflect.deleteProperty(event_card, "archive");

        return { event_card };
    }
}

export { GetEventCardDataUsecase }