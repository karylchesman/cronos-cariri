import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class UpdateUserRolesForeingkeys1667502513890 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys("user_roles", [
            new TableForeignKey({
                name: "FK_ROLE_ID_USERROLES",
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                columnNames: ["role_id"]
            }),
            new TableForeignKey({
                name: "FK_USER_ID_USERROLES",
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                columnNames: ["user_id"]
            })
        ])

        await queryRunner.createForeignKeys("user_roles", [
            new TableForeignKey({
                name: "FK_ROLE_ID_USERROLES",
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                columnNames: ["role_id"],
                onDelete: "CASCADE"
            }),
            new TableForeignKey({
                name: "FK_USER_ID_USERROLES",
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                columnNames: ["user_id"],
                onDelete: "CASCADE"
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys("user_roles", [
            new TableForeignKey({
                name: "FK_ROLE_ID_USERROLES",
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                columnNames: ["role_id"],
                onDelete: "CASCADE"
            }),
            new TableForeignKey({
                name: "FK_USER_ID_USERROLES",
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                columnNames: ["user_id"],
                onDelete: "CASCADE"
            })
        ])

        await queryRunner.createForeignKeys("user_roles", [
            new TableForeignKey({
                name: "FK_ROLE_ID_USERROLES",
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                columnNames: ["role_id"]
            }),
            new TableForeignKey({
                name: "FK_USER_ID_USERROLES",
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                columnNames: ["user_id"]
            })
        ])
    }

}
