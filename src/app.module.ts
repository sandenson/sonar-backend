import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { dataSourceOptions } from '../db/datasource';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ENV: Joi.string().valid('dev', 'test', 'prod').default('dev'),
        PG_DB_NAME: Joi.string().required(),
        PG_PASS: Joi.string().required(),
        PG_USER: Joi.string().required(),
        PG_PORT: Joi.number().port().default(5432),
        PG_HOST: Joi.string().default('localhost'),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
