import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class UpdateRolePermissionsForeingkeys1667503607415 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys("role_permissions", [
            new TableForeignKey({
                name: "FK_ROLE_ID_ROLEPERMISSIONS",
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                columnNames: ["role_id"]
            }),
            new TableForeignKey({
                name: "FK_PERMISSION_ID_ROLEPERMISSIONS",
                referencedColumnNames: ["id"],
                referencedTableName: "permissions",
                columnNames: ["permission_id"]
            })
        ])

        await queryRunner.createForeignKeys("role_permissions", [
            new TableForeignKey({
                name: "FK_ROLE_ID_ROLEPERMISSIONS",
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                columnNames: ["role_id"],
                onDelete: "CASCADE"
            }),
            new TableForeignKey({
                name: "FK_PERMISSION_ID_ROLEPERMISSIONS",
                referencedColumnNames: ["id"],
                referencedTableName: "permissions",
                columnNames: ["permission_id"],
                onDelete: "CASCADE"
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys("role_permissions", [
            new TableForeignKey({
                name: "FK_ROLE_ID_ROLEPERMISSIONS",
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                columnNames: ["role_id"],
                onDelete: "CASCADE"
            }),
            new TableForeignKey({
                name: "FK_PERMISSION_ID_ROLEPERMISSIONS",
                referencedColumnNames: ["id"],
                referencedTableName: "permissions",
                columnNames: ["permission_id"],
                onDelete: "CASCADE"
            })
        ])

        await queryRunner.createForeignKeys("role_permissions", [
            new TableForeignKey({
                name: "FK_ROLE_ID_ROLEPERMISSIONS",
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                columnNames: ["role_id"]
            }),
            new TableForeignKey({
                name: "FK_PERMISSION_ID_ROLEPERMISSIONS",
                referencedColumnNames: ["id"],
                referencedTableName: "permissions",
                columnNames: ["permission_id"]
            })
        ])
    }

}
