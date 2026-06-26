// src/configure-app.ts
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configDotenv } from 'dotenv';

export function configureApp(app: INestApplication) {
  configDotenv();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  const isEnvTest = process.env.ENV === 'test';

  // 2. Swagger Configuration
  const document = new DocumentBuilder()
    .setTitle('Sonar' + (isEnvTest ? ' Testes' : ''))
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

  const swaggerCdn = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.32.8';

  SwaggerModule.setup(
    'api',
    app,
    () => SwaggerModule.createDocument(app, document),
    isEnvTest
      ? undefined
      : {
          customCssUrl: `${swaggerCdn}/swagger-ui.css`,
          customJs: [
            `${swaggerCdn}/swagger-ui-bundle.js`,
            `${swaggerCdn}/swagger-ui-standalone-preset.js`,
          ],
        },
  );
}
