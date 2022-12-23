import { DataSourceOptions } from 'typeorm';
import path from 'path';

const entitiesDir = String(process.env.TYPEORM_ENTITIES_DIR).split('/');
const migrationsDir = String(process.env.TYPEORM_MIGRATIONS_DIR).split('/');

const dbconfig: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path.resolve(__dirname, ...entitiesDir)],
    migrations: [path.resolve(__dirname, ...migrationsDir)],
};

export default dbconfig;
