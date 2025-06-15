// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Real-time Bus Tracking API')
    .setDescription('API documentation for bus registration, trip scheduling, and real-time tracking')
    .setVersion('1.0')
    .addTag('Bus')
    .addTag('Trip')
    .addTag('Route')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Visit http://localhost:3000/api

  await app.listen(3000);
}
bootstrap();
