import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpToRCPExceptionFilter } from 'apps/common/base-exception';

async function bootstrap() {
  const logger = new Logger('ProductMS-main');
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: envs.port
    }
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }))

  app.useGlobalFilters(new HttpToRCPExceptionFilter())

  console.log('envs', envs)
  await app.listen();
  logger.log(`ProductMSS running on port ${envs.port}`);
}
bootstrap();
