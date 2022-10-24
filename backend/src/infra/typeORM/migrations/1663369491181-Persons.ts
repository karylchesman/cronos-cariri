import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Persons1663369491181 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "persons",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "phonenumber1",
                    type: "varchar"
                },
                {
                    name: "phonenumber2",
                    type: "varchar",
                    isNullable: true,
                    default: null
                },
                {
                    name: "gender",
                    type: "enum",
                    enum: ["Masculino", "Feminino"]
                },
                {
                    name: "cpf",
                    type: "varchar"
                },
                {
                    name: "rg",
                    type: "varchar",
                    isNullable: true,
                    default: null
                },
                {
                    name: "bith_date",
                    type: "date"
                },
                {
                    name: "blood_type",
                    type: "varchar",
                    isNullable: true,
                    default: null
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
        await queryRunner.dropTable("persons");
    }

}
