import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { ClientExceptionFilter } from 'apps/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Gateway-main');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }))
  app.useGlobalFilters(new ClientExceptionFilter())
  console.log('envs', envs)
  await app.listen(envs.port);
  logger.log(`Gateway running on port ${envs.port}`);
}
bootstrap();
