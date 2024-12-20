import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { NATS_SERVICE } from '../config';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'apps/common';


@Controller('orders')
export class OrdersController {
    constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) { }

    @Post()
    createOrder(@Body() input: any) {
        return this.natsClient.send({ cmd: "create_order" }, input)
    }

    @Get()
    getAllOrders(@Query() param: PaginationDto) {
        return this.natsClient.send({ cmd: "find_all_orders" }, param)
    }

    @Get(":id")
    getOneOrder(@Param('id') id: string) {
        return this.natsClient.send({ cmd: "find_one_order" }, id)
    }

}
