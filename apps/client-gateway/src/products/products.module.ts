import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCTS_MS } from '../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_MS, transport: Transport.TCP, options: {
          host: envs.productMsHost,
          port: envs.productMsPort,
        }
      }
    ])],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule { }
