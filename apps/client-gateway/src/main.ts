import { NestFactory } from '@nestjs/core';
import { ClientGatewayModule } from './client-gateway.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { ClientExceptionFilter } from 'apps/common';

async function bootstrap() {
  const logger = new Logger('Gateway-main');

  const app = await NestFactory.create(ClientGatewayModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }))
  app.useGlobalFilters(new ClientExceptionFilter())
  await app.listen(envs.port);
  logger.log(`Gateway running on port ${envs.port}`);
}
bootstrap();
