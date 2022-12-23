import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import {
    ECategoryGenderType,
    ECategoryTypes,
} from '../../../domain/entities/category';

@Entity('categories')
class ORMCategory {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    event_id!: string;

    @Column()
    distance!: number;

    @Column()
    start_age!: number;

    @Column()
    end_age!: number;

    @Column({
        type: 'enum',
        enum: ECategoryTypes,
    })
    category_type!: ECategoryTypes;

    @Column({
        type: 'enum',
        enum: ECategoryGenderType,
    })
    gender_type!: ECategoryGenderType;

    @Column()
    order!: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}

export { ORMCategory };
