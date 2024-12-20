import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDERS_MS } from '../config';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: ORDERS_MS,
                transport: Transport.TCP, options: {
                    port: envs.orderMsPort,
                    host: envs.orderMsHost
                }
            },
        ])
    ],
    controllers: [OrdersController]
})
export class OrdersModule { }
