import { EEventAttachmentTypes } from "../../entities/event-attachment";
import { EventAttachmentRepositoryProtocol } from "../../repositories/interfaces/event-attachment-repository-protocol";
import { isString } from "../../utils/validators";

export type IGetEventBannerArchiveUsecaseRequest = {
    file_name: string;
    banner_archive_id: string;
};

export type IGetEventBannerArchiveUsecaseResponse = {
    event_banner: {
        archive: string,
        filename: string,
        mimetype: string
    }
};

class GetEventBannerArchiveUsecase {
    constructor(
        private eventAttachmentRepository: EventAttachmentRepositoryProtocol
    ) { }

    async execute({ file_name, banner_archive_id }: IGetEventBannerArchiveUsecaseRequest): Promise<IGetEventBannerArchiveUsecaseResponse> {
        isString(file_name, "Arquivo inválido.");
        isString(banner_archive_id, "ID do arquivo inválido.");

        const [event_banner] = await this.eventAttachmentRepository.find({
            id: banner_archive_id,
            attachment_type: EEventAttachmentTypes["event_banner"],
            filename: file_name
        });

        if (!event_banner) {
            throw new Error("Banner não encontrado.");
        }

        return {
            event_banner: {
                archive: event_banner.archive,
                filename: event_banner.filename,
                mimetype: event_banner.mimetype
            }
        };
    }
}

export { GetEventBannerArchiveUsecase }