import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class EventParameters1670356679004 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "event_parameters",
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
                    name: "inscription_made_email",
                    type: "boolean",
                    default: false
                },
                {
                    name: "inscription_confirmed_email",
                    type: "boolean",
                    default: false
                },
                {
                    name: "inscription_canceled_email",
                    type: "boolean",
                    default: false
                },
                {
                    name: "show_inscription_list",
                    type: "enum",
                    enum: ["Mostrar", "Não Mostrar", "Somente Confirmadas"]
                },
                {
                    name: "pagseguro_token",
                    type: "varchar"
                },
                {
                    name: "pagseguro_email",
                    type: "varchar"
                },
                {
                    name: "pagseguro_api_link",
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
                    name: "FK_EVENTS_EVENT_ID_EVENTPARAMETERS",
                    columnNames: ["event_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "events",
                    onDelete: "CASCADE"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("event_parameters")
    }

}
