import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Events1666109632486 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "events",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "event_date",
                    type: "date"
                },
                {
                    name: "event_time",
                    type: "time"
                },
                {
                    name: "address_street",
                    type: "varchar"
                },
                {
                    name: "address_number",
                    type: "varchar"
                },
                {
                    name: "address_district",
                    type: "varchar"
                },
                {
                    name: "address_city",
                    type: "varchar"
                },
                {
                    name: "address_uf",
                    type: "varchar"
                },
                {
                    name: "address_cep",
                    type: "varchar"
                },
                {
                    name: "email",
                    type: "varchar"
                },
                {
                    name: "phonenumber",
                    type: "varchar",
                    isNullable: true,
                    default: null
                },
                {
                    name: "event_type",
                    type: "enum",
                    enum: ["MTB", "Trail", "Corrida de Rua"]
                },
                {
                    name: "inscription_limit_date",
                    type: "date"
                },
                {
                    name: "status",
                    type: "enum",
                    enum: ["Publicado", "Não Publicado", "Cancelado"]
                },
                {
                    name: "url_path",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "banner_archive_id",
                    type: "varchar",
                    isNullable: true,
                    default: null
                },
                {
                    name: "card_archive_id",
                    type: "varchar",
                    isNullable: true,
                    default: null
                },
                {
                    name: "result_type",
                    type: "enum",
                    enum: ["Importação", "Integração", "PDF"],
                    isNullable: true,
                    default: null
                },
                {
                    name: "details",
                    type: "text",
                    isNullable: true,
                    default: null
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
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("events");
    }

}
