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

  if (process.env.ENV === 'dev') {
    return {
      host,
      port,
      username,
      password,
      database,
    };
  }

  return {
    url: `postgresql://${username}:${password}@${host}:${port}/${database}`,
    ssl: {
      rejectUnauthorized: false,
    },
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
  migrations:
    process.env.ENV === 'dev'
      ? [path.resolve(__dirname, './migrations/*{.ts,.js}')]
      : ['dist/db/migrations/*.js'],
  extra: {
    max: 1,
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 1000,
  },
};

export const dataSource = new DataSource(dataSourceOptions);
