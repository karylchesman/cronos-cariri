import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EPersonGender } from '../../../domain/entities/person';

@Entity("persons")
class ORMPerson {

    @PrimaryColumn()
    id!: string;

    @Column()
    phonenumber1!: string;

    @Column()
    phonenumber2!: string;

    @Column({
        type: "enum",
        enum: EPersonGender
    })
    gender!: EPersonGender;

    @Column()
    cpf!: string;

    @Column()
    rg!: string;

    @Column()
    bith_date!: Date;

    @Column()
    blood_type!: string;

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

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date

}

export { ORMPerson }