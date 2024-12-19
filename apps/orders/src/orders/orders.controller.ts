import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @MessagePattern({ cmd: 'create_order' })
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern({ cmd: 'find_all_orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_order' })
  findOne(@Payload('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @MessagePattern({ cmd: 'update_order' })
  update(@Payload('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @MessagePattern({ cmd: 'delete_order' })
  remove(@Payload('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
