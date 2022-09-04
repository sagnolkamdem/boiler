import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ppid } from 'process';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');

  app.enableCors();

  // Set configService
  const configService = app.get(ConfigService);
  const port = configService.get<string>('APP_PORT');

  // Create Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Presence app')
    .setDescription('The api of presence app')
    .setVersion('1.0')
    .addTag('presence')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);


  await app.listen(port);
}
bootstrap();
