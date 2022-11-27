import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class EventAttachments1669564061223 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "event_attachments",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "event_id",
                    type: "varchar"
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: true,
                    default: null
                },
                {
                    name: "attachment_type",
                    type: "varchar"
                },
                {
                    name: "filename",
                    type: "varchar"
                },
                {
                    name: "archive",
                    type: "varbinary"
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
                    name: "FK_EVENT_ID_EVENTS",
                    referencedColumnNames: ["id"],
                    referencedTableName: "events",
                    columnNames: ["event_id"]
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("event_attachments")
    }

}
