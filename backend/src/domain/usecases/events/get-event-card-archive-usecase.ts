import { EEventAttachmentTypes } from "../../entities/event-attachment";
import { EventAttachmentRepositoryProtocol } from "../../repositories/interfaces/event-attachment-repository-protocol";
import { isString } from "../../utils/validators";

export type IGetEventCardArchiveUsecaseRequest = {
    file_name: string;
    card_archive_id: string;
};

export type IGetEventCardArchiveUsecaseResponse = {
    event_card: {
        archive: string,
        filename: string,
        mimetype: string
    }
};

class GetEventCardArchiveUsecase {
    constructor(
        private eventAttachmentRepository: EventAttachmentRepositoryProtocol
    ) { }

    async execute({ file_name, card_archive_id }: IGetEventCardArchiveUsecaseRequest): Promise<IGetEventCardArchiveUsecaseResponse> {
        isString(file_name, "Arquivo inválido.");
        isString(card_archive_id, "ID do arquivo inválido.");

        const [event_card] = await this.eventAttachmentRepository.find({
            id: card_archive_id,
            attachment_type: EEventAttachmentTypes["event_card"],
            filename: file_name
        });

        if (!event_card) {
            throw new Error("Capa não encontrada.");
        }

        return {
            event_card: {
                archive: event_card.archive,
                filename: event_card.filename,
                mimetype: event_card.mimetype
            }
        };
    }
}

export { GetEventCardArchiveUsecase }