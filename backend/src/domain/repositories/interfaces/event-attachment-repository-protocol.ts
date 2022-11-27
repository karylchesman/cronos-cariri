import { EventAttachmentProps } from "../../entities/event-attachment";

interface EventAttachmentRepositoryProtocol {
    save: (event_attachment: EventAttachmentProps) => Promise<EventAttachmentProps>;
    saveEventBanner: (event_id: string, event_attachment: EventAttachmentProps, previous_banner_id?: string) => Promise<EventAttachmentProps>;
    saveEventCard: (event_id: string, event_attachment: EventAttachmentProps, previous_card_id?: string) => Promise<EventAttachmentProps>;
    update: (event_attachment: EventAttachmentProps) => Promise<EventAttachmentProps>;
    find: (event_attachment?: Partial<EventAttachmentProps>) => Promise<EventAttachmentProps[]>;
    findById: (id: string) => Promise<EventAttachmentProps | null>;
    deleteById: (id: string) => Promise<void>;
}

export { EventAttachmentRepositoryProtocol }