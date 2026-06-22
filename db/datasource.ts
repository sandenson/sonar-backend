import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import path from 'node:path';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// Credit: https://javascript.plainenglish.io/nestjs-typeorm-migrations-in-2025-50214275ec8d

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('PG_HOST'),
  port: configService.get<number>('PG_PORT'),
  username: configService.get<string>('PG_USER'),
  password: configService.get<string>('PG_PASS'),
  database: configService.get<string>('PG_DB_NAME'),
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
};

export const dataSource = new DataSource(dataSourceOptions);
