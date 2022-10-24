import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class RolePermissions1666639956989 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "role_permissions",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "role_id",
                    type: "varchar"
                },
                {
                    name: "permission_id",
                    type: "varchar"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [
                {
                    name: "FK_ROLE_ID_ROLEPERMISSIONS",
                    referencedColumnNames: ["id"],
                    referencedTableName: "roles",
                    columnNames: ["role_id"]
                },
                {
                    name: "FK_PERMISSION_ID_ROLEPERMISSIONS",
                    referencedColumnNames: ["id"],
                    referencedTableName: "permissions",
                    columnNames: ["permission_id"]
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("role_permissions")
    }

}
