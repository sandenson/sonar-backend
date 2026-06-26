import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { configureApp } from '../src/app-config';
import { AppModule } from '../src/app.module';

let isNestInitialized = false;
let nestAppPromise: Promise<void> | null = null;

const server: ReturnType<typeof express> = express();

export const createNestServer = async (expressInstance: any): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  configureApp(app);

  await app.init();
  isNestInitialized = true;
};

type NextCallback = () => void;

server.use(async (...args: unknown[]) => {
  const next = args[2] as NextCallback;

  if (!isNestInitialized) {
    if (!nestAppPromise) {
      nestAppPromise = createNestServer(server).catch((err) => {
        console.error('Falha crítica no boot do NestJS:', err);
      });
    }
    await nestAppPromise;
  }

  if (typeof next === 'function') {
    next();
  }
});

export default server;
