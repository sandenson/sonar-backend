import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ENVIRONMENT: Joi.string().valid('dev', 'test', 'prod').default('dev'),
        PG_DB_NAME: Joi.string().required(),
        PG_PASS: Joi.string().required(),
        PG_USER: Joi.string().required(),
        PG_PORT: Joi.number().port().default(5432),
        PG_HOST: Joi.string().default('localhost'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('PG_HOST'),
        port: config.get<number>('PG_PORT'),
        username: config.get<string>('PG_USER'),
        password: config.get<string>('PG_PASS'),
        database: config.get<string>('PG_DB_NAME'),
        entities: [],
        synchronize: false,
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
