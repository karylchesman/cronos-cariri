import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { ORMRolePermission } from './ORMRolePermission';

@Entity("permissions")
class ORMPermission {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    identifier!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @JoinColumn({ name: "id", referencedColumnName: "permission_id" })
    @OneToMany(() => ORMRolePermission, role_permission => role_permission.role)
    role_permissions!: ORMRolePermission[];
}

export { ORMPermission }