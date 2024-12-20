import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCTS_MS } from 'apps/client-gateway/src/config';
import { envs } from '../config/envs';

@Module({
  imports: [ClientsModule.register([
    {
      name: PRODUCTS_MS,
      transport: Transport.TCP,
      options: {
        port: envs.productMsPort,
        host: envs.productMsHost
      }
    }
  ])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
