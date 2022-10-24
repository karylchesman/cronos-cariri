import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn, OneToOne } from 'typeorm';
import { ORMPermission } from './ORMPermission';
import { ORMRole } from './ORMRole';

@Entity("role_permissions")
class ORMRolePermission {
    @PrimaryColumn()
    id!: string;

    @Column()
    role_id!: string;

    @Column()
    permission_id!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date

    @JoinColumn({ name: "permission_id", referencedColumnName: "id" })
    @OneToOne(() => ORMPermission)
    permission!: ORMPermission;

    @JoinColumn({ name: "role_id", referencedColumnName: "id" })
    @OneToOne(() => ORMRole)
    role!: ORMRole;
}

export { ORMRolePermission }