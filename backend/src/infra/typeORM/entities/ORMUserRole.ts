import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn, OneToOne } from 'typeorm';
import { ORMRole } from './ORMRole';
import { ORMUser } from './ORMUser';

@Entity("user_roles")
class ORMUserRole {
    @PrimaryColumn()
    id!: string;

    @Column()
    role_id!: string;

    @Column()
    user_id!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date

    @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    @OneToOne(() => ORMUser)
    user!: ORMUser[];

    @JoinColumn({ name: "role_id", referencedColumnName: "id" })
    @OneToOne(() => ORMRole)
    role!: ORMRole[];
}

export { ORMUserRole }