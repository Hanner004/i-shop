import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  // app.use(bodyParser.json({ limit: '50mb' }));
  // app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    origin: '*',
  });
  app.use(
    '/api/v1/i-shop/docs',
    basicAuth({
      challenge: true,
      users: { 'i-shop': configService.get<string>('SWAGGER_PASS') },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('i-shop')
    .setDescription('API documentation')
    .setVersion('0.0.1')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/i-shop/docs', app, document, {
    // explorer: true,
    swaggerOptions: {
      filter: true,
      // showRequestDuration: true,
    },
  });

  await app.listen(configService.get('HTTP_SERVER_PORT') || 3000);
}
bootstrap();
