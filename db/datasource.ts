import { config } from 'dotenv';
import path from 'node:path';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// Credit: https://javascript.plainenglish.io/nestjs-typeorm-migrations-in-2025-50214275ec8d

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DB_NAME,
  entities: [
    path.resolve(__dirname, '../src/**/*.entity.ts'),
    'dist/**/*.entity.js',
  ],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  migrations: [
    path.resolve(__dirname, './migrations/*{.ts,.js}'),
    'dist/db/migrations/*.js',
  ],
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    max: 1,
    connectionTimeoutMillis: 5000,
  },
};

export const dataSource = new DataSource(dataSourceOptions);
