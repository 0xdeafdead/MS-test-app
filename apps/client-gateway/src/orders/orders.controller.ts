import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { ORDERS_MS } from '../config';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'apps/common';

@Controller('orders')
export class OrdersController {
    constructor(@Inject(ORDERS_MS) private readonly ordersService: ClientProxy) { }

    @Post()
    createOrder(@Body() input: any) {
        return this.ordersService.send({ cmd: "create_order" }, input)
    }

    @Get()
    getAllOrders(@Query() param: PaginationDto) {
        return this.ordersService.send({ cmd: "find_all_orders" }, param)
    }

    @Get(":id")
    getOneOrder(@Param('id') id: string) {
        return this.ordersService.send({ cmd: "find_one_order" }, id)
    }

}
