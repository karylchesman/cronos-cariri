import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { ORMPerson } from './ORMPerson';

@Entity("users")
class ORMUser {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({
        nullable: true,
        default: null
    })
    person_id!: string

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @JoinColumn({ name: "person_id", referencedColumnName: "id" })
    @OneToOne(() => ORMPerson)
    person!: ORMPerson;
}

export { ORMUser }