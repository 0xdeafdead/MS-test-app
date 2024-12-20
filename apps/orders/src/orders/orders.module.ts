import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from '../config/envs';
import { NATS_SERVER } from '../config';

@Module({
  imports: [ClientsModule.register([
    {
      name: NATS_SERVER,
      transport: Transport.NATS,
      options: {
        servers: ['nats://localhost:4222']
      }
    }
  ])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
