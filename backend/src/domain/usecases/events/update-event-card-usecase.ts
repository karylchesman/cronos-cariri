import { EEventAttachmentTypes, EventAttachment, EventAttachmentProps } from "../../entities/event-attachment";
import { EventAttachmentRepositoryProtocol } from "../../repositories/interfaces/event-attachment-repository-protocol";
import { EventRepositoryProtocol } from "../../repositories/interfaces/event-repository-protocol";
import { isString } from "../../utils/validators";

export interface IUpdateEventCardUsecaseResquest {
    event_id: string;
    event_card: {
        filename: string;
        archive: string;
    };
}

export type IUpdateEventCardUsecaseResponse = {
    event_card: Exclude<EventAttachmentProps, "archive">;
};

class UpdateEventCardUsecase {
    constructor(
        private eventRepository: EventRepositoryProtocol,
        private eventAttachmentRepository: EventAttachmentRepositoryProtocol
    ) { }

    async execute({ event_id, event_card }: IUpdateEventCardUsecaseResquest): Promise<IUpdateEventCardUsecaseResponse> {

        isString(event_id, "Evento inválido.");

        const eventToChangeCard = await this.eventRepository.findById(event_id);

        if (!eventToChangeCard) {
            throw new Error("Evento não encontrado.");
        }

        const new_event_card = new EventAttachment({
            ...event_card,
            attachment_type: EEventAttachmentTypes["event_card"],
            event_id
        });

        new_event_card.validate();

        const [eventCoverAlreadyExists] = await this.eventAttachmentRepository.find({
            event_id,
            attachment_type: EEventAttachmentTypes["event_card"]
        })

        const saved_card = await this.eventAttachmentRepository.saveEventBanner(
            event_id,
            new_event_card.getProps(),
            eventCoverAlreadyExists ? eventCoverAlreadyExists.id : undefined
        )

        Reflect.deleteProperty(saved_card, "archive");

        return {
            event_card: saved_card
        };
    }
}

export { UpdateEventCardUsecase }