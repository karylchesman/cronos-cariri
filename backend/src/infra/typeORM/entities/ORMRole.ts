import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { ORMRolePermission } from './ORMRolePermission';

@Entity("roles")
class ORMRole {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date

    @JoinColumn({ name: "id", referencedColumnName: "role_id" })
    @OneToMany(() => ORMRolePermission, role_permission => role_permission.permission)
    role_permissions!: ORMRolePermission[];
}

export { ORMRole }