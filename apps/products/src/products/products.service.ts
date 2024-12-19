import { HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from '../../../common/pagination.dto';
import { RpcException } from '@nestjs/microservices';
import { catchError, from, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ProductsService.name);
  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to db')
  }

  create(createProductDto: CreateProductDto) {
    console.log('createProductDto', createProductDto)
    return "This actioncreates a new product"
    // return this.product.create({
    //   data: createProductDto
    // })
  }

  findAll(pagination: PaginationDto) {
    console.log('pagination', pagination)
    return this.product.findMany({
      where: {}
    })
    return `This action returns all products`;
  }

  async findOne(id: number) {
    return from(this.product.findFirst({
      where: {
        id
      }
    })).pipe(
      switchMap((product) => {
        if (!product)
          throw new NotFoundException("Not found product with id: " + id)
        return of(product)
      }),
      catchError((err) => {
        this.logger.error(err.message);
        let newError: HttpException;
        if (err instanceof HttpException) {
          newError = err;
        } else {
          newError = new InternalServerErrorException('Could not found product with id: ' + id);
        }
        return throwError(() => newError)
      })
    )
  }

  update(updateProductDto: UpdateProductDto) {
    const { id, ...data } = updateProductDto;
    console.log('data', data)
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
