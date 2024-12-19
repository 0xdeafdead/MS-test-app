import { Body, Controller, Delete, Get, HttpException, Inject, InternalServerErrorException, Logger, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PRODUCTS_MS } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'apps/common';
import { catchError, throwError } from 'rxjs';

@Controller('products')
export class ProductsController {
  private logger = new Logger(ProductsController.name)
  constructor(@Inject(PRODUCTS_MS) private readonly productsService: ClientProxy) { }

  @Post()
  createProduct(@Body() body: any) {
    return 'Create a product'
  }

  @Get()
  getAll(@Query() params: PaginationDto) {
    return this.productsService.send({ cmd: 'find_all_products' }, params);
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.productsService.send({ cmd: 'find_one_product' }, id).pipe(
      catchError((err) => {
        return throwError(() => new RpcException(err))
      })
    )
  }

  @Patch(':id')
  updateOne() {
    return 'Update one product'
  }

  @Delete(':id')
  deleteOne() {
    return 'Delete one product'
  }
}
