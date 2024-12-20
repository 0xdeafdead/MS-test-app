import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS, options: {
          servers: ["nats://localhost:4222"]
        }
      },
    ])],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule { }
