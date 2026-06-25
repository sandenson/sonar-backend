import { config } from 'dotenv';
import path from 'node:path';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// Credit: https://javascript.plainenglish.io/nestjs-typeorm-migrations-in-2025-50214275ec8d

config();

const initDbConnectionData = () => {
  const host = process.env.PG_HOST;
  const port = process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432;
  const username = process.env.PG_USER;
  const password = process.env.PG_PASS;
  const database = process.env.PG_DB_NAME;

  return process.env.ENV === 'dev'
    ? {
        host,
        port,
        username,
        password,
        database,
      }
    : {
        url: `postgresql://${username}:${password}@${host}:${port}/${database}`,
      };
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  ...initDbConnectionData(),
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
  extra: {
    max: 1,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 1000,
    ssl: process.env.ENV === 'dev' ? false : { rejectUnauthorized: false },
  },
};

export const dataSource = new DataSource(dataSourceOptions);
