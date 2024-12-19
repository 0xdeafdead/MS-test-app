import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/pagination.dto';

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
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
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
