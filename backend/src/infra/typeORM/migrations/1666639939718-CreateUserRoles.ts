import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserRoles1666639939718 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user_roles",
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
                    name: "user_id",
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
                    name: "FK_ROLE_ID_USERROLES",
                    referencedColumnNames: ["id"],
                    referencedTableName: "roles",
                    columnNames: ["role_id"]
                },
                {
                    name: "FK_USER_ID_USERROLES",
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    columnNames: ["user_id"]
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_roles")
    }

}
