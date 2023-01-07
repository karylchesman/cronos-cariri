import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePayplans1672926996761 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'payplans',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'event_id',
                        type: 'varchar',
                    },
                    {
                        name: 'banner_archive_id',
                        type: 'varchar',
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: 'elderly_discount',
                        type: 'float',
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: 'elderly_age',
                        type: 'float',
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: 'details',
                        type: 'varchar',
                        length: '1000',
                    },
                    {
                        name: 'value',
                        type: 'double',
                        default: null,
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FK_EVENTS_EVENT_ID_PAYPLANS',
                        columnNames: ['event_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'events',
                        onDelete: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('payplans');
    }
}
