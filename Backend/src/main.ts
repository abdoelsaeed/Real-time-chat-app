/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // منع الحقول غير المعرفة
    }),
  );  
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
