import { Repository } from "typeorm";
import { AppDataSource } from "../../infra/typeORM/connection";
import { ORMEvent } from "../../infra/typeORM/entities/ORMEvent";
import { ORMEventAttachment } from "../../infra/typeORM/entities/ORMEventAttachment";
import { EventAttachmentProps } from "../entities/event-attachment";
import { EventAttachmentRepositoryProtocol } from "./interfaces/event-attachment-repository-protocol";

class EventAttachmentRepository implements EventAttachmentRepositoryProtocol {
    private eventAttachmentRepository: Repository<ORMEventAttachment>;

    constructor() {
        this.eventAttachmentRepository = AppDataSource.getRepository(ORMEventAttachment);
    }

    async save(event_attachment: EventAttachmentProps) {
        const new_event_attachment = this.eventAttachmentRepository.create(event_attachment)

        await this.eventAttachmentRepository.save(new_event_attachment);

        return new_event_attachment;
    }

    async saveEventBanner(event_id: string, event_attachment: EventAttachmentProps, previous_banner_id?: string) {
        const new_event_attachment = await this.eventAttachmentRepository.manager.transaction(async (entityManagerTransaction) => {

            if (previous_banner_id) {
                await entityManagerTransaction.delete(ORMEventAttachment, { id: previous_banner_id });
            }

            const new_event_attachment = entityManagerTransaction.create(ORMEventAttachment, event_attachment);

            await entityManagerTransaction.save(new_event_attachment);

            const update_result = await entityManagerTransaction.update(ORMEvent, { id: event_id }, { banner_archive_id: new_event_attachment.id });

            if (update_result.affected === undefined || update_result.affected < 1) throw new Error("Falha ao tentar vincular imagem de banner ao evento.");

            return new_event_attachment;
        })

        return new_event_attachment;
    }

    async saveEventCard(event_id: string, event_attachment: EventAttachmentProps, previous_card_id?: string) {
        const new_event_attachment = await this.eventAttachmentRepository.manager.transaction(async (entityManagerTransaction) => {

            if (previous_card_id) {
                await entityManagerTransaction.delete(ORMEventAttachment, { id: previous_card_id });
            }

            const new_event_attachment = entityManagerTransaction.create(ORMEventAttachment, event_attachment);

            await entityManagerTransaction.save(new_event_attachment);

            const update_result = await entityManagerTransaction.update(ORMEvent, { id: event_id }, { card_archive_id: new_event_attachment.id });

            if (update_result.affected === undefined || update_result.affected < 1) throw new Error("Falha ao tentar vincular imagem de card ao evento.");

            return new_event_attachment;
        })

        return new_event_attachment;
    }

    async update(event_attachment: EventAttachmentProps) {
        event_attachment.updated_at = new Date();

        await this.eventAttachmentRepository.update(String(event_attachment.id), event_attachment);

        return event_attachment;
    }

    async find(event_attachment?: Partial<EventAttachmentProps>) {

        const found_event_attachments = await this.eventAttachmentRepository.find({
            where: event_attachment
        })

        return found_event_attachments;
    }

    async findById(id: string) {
        const event_attachment = await this.eventAttachmentRepository.findOne({
            where: {
                id
            }
        })

        if (event_attachment) {
            return event_attachment;
        }

        return null;
    }

    async deleteById(id: string) {
        await this.eventAttachmentRepository.delete(id);

        return;
    }

}

export { EventAttachmentRepository }