import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EUserRoles } from '../../../domain/entities/user';

@Entity("users")
class User {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({
        type: "enum",
        enum: EUserRoles
    })
    role!: EUserRoles;

    @Column({
        nullable: true,
        default: null
    })
    person_id!: string

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date
}

export { User }