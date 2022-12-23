import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategories1671824312650 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'categories',
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
                        name: 'distance',
                        type: 'double',
                    },
                    {
                        name: 'start_age',
                        type: 'double',
                    },
                    {
                        name: 'end_age',
                        type: 'double',
                    },
                    {
                        name: 'category_type',
                        type: 'varchar',
                    },
                    {
                        name: 'gender_type',
                        type: 'varchar',
                    },
                    {
                        name: 'order',
                        type: 'int',
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
                        name: 'FK_EVENTS_EVENT_ID_CATEGORIES',
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
        await queryRunner.dropTable('categories');
    }
}
