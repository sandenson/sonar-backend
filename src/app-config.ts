// src/configure-app.ts
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configDotenv } from 'dotenv';

export function configureApp(app: INestApplication) {
  configDotenv();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  // 2. Swagger Configuration
  const document = new DocumentBuilder()
    .setTitle('Sonar' + (process.env.ENV === 'test' ? ' Testes' : ''))
    .setDescription('Sonar - suas músicas, suas histórias')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'jwt-auth',
    )
    .build();

  SwaggerModule.setup('api', app, () =>
    SwaggerModule.createDocument(app, document),
  );
}
