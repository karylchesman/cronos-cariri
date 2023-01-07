import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('payplans')
class ORMPayPlan {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    event_id!: string;

    @Column({
        nullable: true,
        type: 'varchar',
    })
    banner_archive_id!: string | null;

    @Column({
        nullable: true,
        type: 'float',
    })
    elderly_discount!: number | null;

    @Column({
        nullable: true,
        type: 'float',
    })
    elderly_age!: number | null;

    @Column()
    details!: string;

    @Column({
        type: 'double',
        default: null,
        nullable: true,
    })
    value!: number | null;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}

export { ORMPayPlan };
