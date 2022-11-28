import { EEventAttachmentTypes, EventAttachment, EventAttachmentProps } from "../../entities/event-attachment";
import { EventAttachmentRepositoryProtocol } from "../../repositories/interfaces/event-attachment-repository-protocol";
import { EventRepositoryProtocol } from "../../repositories/interfaces/event-repository-protocol";
import { isString } from "../../utils/validators";

export interface IUpdateEventBannerUsecaseResquest {
    event_id: string;
    event_banner: {
        filename: string;
        archive: string;
        mimetype: string;
    };
}

export type IUpdateEventBannerUsecaseResponse = {
    event_banner: Exclude<EventAttachmentProps, "archive">;
};

class UpdateEventBannerUsecase {
    constructor(
        private eventRepository: EventRepositoryProtocol,
        private eventAttachmentRepository: EventAttachmentRepositoryProtocol
    ) { }

    async execute({ event_id, event_banner }: IUpdateEventBannerUsecaseResquest): Promise<IUpdateEventBannerUsecaseResponse> {

        isString(event_id, "Evento inválido.");

        const eventToChangeBanner = await this.eventRepository.findById(event_id);

        if (!eventToChangeBanner) {
            throw new Error("Evento não encontrado.");
        }

        const new_event_banner = new EventAttachment({
            ...event_banner,
            attachment_type: EEventAttachmentTypes["event_banner"],
            event_id
        });

        new_event_banner.validate();

        const [eventBannerAlreadyExists] = await this.eventAttachmentRepository.find({
            event_id,
            attachment_type: EEventAttachmentTypes["event_banner"]
        })

        const saved_banner = await this.eventAttachmentRepository.saveEventBanner(
            event_id,
            new_event_banner.getProps(),
            eventBannerAlreadyExists ? eventBannerAlreadyExists.id : undefined
        )

        Reflect.deleteProperty(saved_banner, "archive");

        return {
            event_banner: saved_banner
        };
    }
}

export { UpdateEventBannerUsecase }