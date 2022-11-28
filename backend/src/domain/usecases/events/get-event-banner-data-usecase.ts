import { EEventAttachmentTypes, EventAttachmentProps } from "../../entities/event-attachment";
import { EventAttachmentRepositoryProtocol } from "../../repositories/interfaces/event-attachment-repository-protocol";
import { EventRepositoryProtocol } from "../../repositories/interfaces/event-repository-protocol";
import { isString } from "../../utils/validators";

export type IGetEventBannerDataUsecaseRequest = {
    event_id: string;
    banner_archive_id: string;
};

export type IGetEventBannerDataUsecaseResponse = {
    event_banner: Exclude<EventAttachmentProps, "archive">;
};

class GetEventBannerDataUsecase {
    constructor(
        private eventRepository: EventRepositoryProtocol,
        private eventAttachmentRepository: EventAttachmentRepositoryProtocol
    ) { }

    async execute({ event_id, banner_archive_id }: IGetEventBannerDataUsecaseRequest): Promise<IGetEventBannerDataUsecaseResponse> {
        isString(event_id, "Evento inválida.");
        isString(banner_archive_id, "ID do arquivo inválido.");

        const eventExits = await this.eventRepository.findById(event_id);

        if (!eventExits) {
            throw new Error("Evento não encontrado.");
        }

        const [event_banner] = await this.eventAttachmentRepository.find({
            event_id: eventExits.id,
            id: banner_archive_id,
            attachment_type: EEventAttachmentTypes["event_banner"]
        });

        if (!event_banner) {
            throw new Error("Banner não encontrado.");
        }

        Reflect.deleteProperty(event_banner, "archive");

        return { event_banner };
    }
}

export { GetEventBannerDataUsecase }