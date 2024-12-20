import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { PRODUCTS_MS } from '../config/constants';

@Injectable()
export class OrdersService {
  constructor(@Inject(PRODUCTS_MS) private readonly productsMS: ClientProxy) { }
  create(createOrderDto: CreateOrderDto) {
    return this.productsMS.send({ cmd: 'validate_products' }, createOrderDto.ids).pipe(
      switchMap((res) => {
        return of(res ? "This action will create order" : "Products are not valid. Order not created")
      }),
      catchError((err) => {
        console.log('err', err)
        return throwError(() => new InternalServerErrorException(err))
      })
    )
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
