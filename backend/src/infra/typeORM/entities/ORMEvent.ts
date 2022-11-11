import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EEventResultTypes, EEventStatus, EEventTypes } from '../../../domain/entities/event';
import { EPersonGender } from '../../../domain/entities/person';

@Entity("events")
class ORMEvent {

    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    event_date!: Date;

    @Column()
    event_time!: string;

    @Column()
    address_street!: string;

    @Column()
    address_number!: string;

    @Column()
    address_district!: string;

    @Column()
    address_city!: string;

    @Column()
    address_uf!: string;

    @Column()
    address_cep!: string;

    @Column()
    email!: string;

    @Column({
        nullable: true,
        default: null
    })
    phonenumber!: string;

    @Column({
        type: "enum",
        enum: EEventTypes
    })
    event_type!: EEventTypes;

    @Column()
    inscription_limit_date!: Date;

    @Column({
        unique: true
    })
    url_path!: string;

    @Column({
        type: "enum",
        enum: EEventStatus
    })
    status!: EEventStatus;

    @Column({
        nullable: true,
        default: null
    })
    banner_archive!: string;

    @Column({
        nullable: true,
        default: null
    })
    banner_description!: string;

    @Column({
        type: "enum",
        enum: EEventResultTypes,
        nullable: true,
        default: null
    })
    result_type!: EEventResultTypes;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date

}

export { ORMEvent }