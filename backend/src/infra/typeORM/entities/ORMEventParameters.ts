import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { EShowInscriptionListOption } from '../../../domain/entities/event-parameters';
import { ORMEvent } from './ORMEvent';

@Entity("event_parameters")
class ORMEventParameters {
    @PrimaryColumn()
    id!: string;

    @Column()
    event_id!: string;

    @Column()
    inscription_made_email!: boolean;

    @Column()
    inscription_confirmed_email!: boolean;

    @Column()
    inscription_canceled_email!: boolean;

    @Column({
        enum: EShowInscriptionListOption
    })
    show_inscription_list!: EShowInscriptionListOption;

    @Column()
    pagseguro_token!: string;

    @Column()
    pagseguro_email!: string;

    @Column()
    pagseguro_api_link!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @JoinColumn({ name: "event_id", referencedColumnName: "id" })
    @OneToOne(() => ORMEvent)
    event!: ORMEvent;
}

export { ORMEventParameters }