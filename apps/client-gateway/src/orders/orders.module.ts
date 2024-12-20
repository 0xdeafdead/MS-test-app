import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from '../config';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: NATS_SERVICE,
                transport: Transport.NATS, options: {
                    servers: ["nats://localhost:4222"]
                }
            },
        ])
    ],
    controllers: [OrdersController]
})
export class OrdersModule { }
