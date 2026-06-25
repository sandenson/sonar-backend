import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express } from 'express';
import { configureApp } from '../src/app-config';
import { AppModule } from '../src/app.module';

const server: Express = express();

export const createNestServer = async (expressInstance: any) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  // Apply the same global pipes and Swagger configurations here!
  configureApp(app);

  await app.init();
};

createNestServer(server);
export default server;
