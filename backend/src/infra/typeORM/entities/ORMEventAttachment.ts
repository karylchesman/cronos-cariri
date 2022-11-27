import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EEventAttachmentTypes } from '../../../domain/entities/event-attachment';

@Entity("event_attachments")
class ORMEventAttachment {
    @PrimaryColumn()
    id!: string;

    @Column()
    event_id!: string;

    @Column()
    description!: string;

    @Column()
    attachment_type!: EEventAttachmentTypes;

    @Column()
    filename!: string

    @Column()
    archive!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}

export { ORMEventAttachment }