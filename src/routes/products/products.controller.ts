import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROUTESCONTROLLERS } from '../index.routes';
import { ProductsService } from './products.service';
import { CreateProductDTO, UpdateProductDTO } from 'src/utils/dto';

@ApiTags('products')
@Controller({ path: ROUTESCONTROLLERS.PRODUCTS })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/create-product')
  async createProduct(@Body() data: CreateProductDTO) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'product created',
      data: await this.productsService.createProduct(data),
    };
  }

  @Get('/get-products')
  async getProducts() {
    return {
      statusCode: HttpStatus.OK,
      message: 'products found',
      data: await this.productsService.getProducts(),
    };
  }

  @Get('/get-product/:productId')
  async getProduct(@Param('productId', ParseUUIDPipe) productId: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'product found',
      data: await this.productsService.getProduct(productId),
    };
  }

  @Put('/update-product/:productId')
  async updateProduct(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() data: UpdateProductDTO,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'product updated',
      data: await this.productsService.updateProduct(productId, data),
    };
  }

  @Delete('/delete-product/:productId')
  async deleteProduct(@Param('productId', ParseUUIDPipe) productId: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'product deleted',
      data: await this.productsService.deleteProduct(productId),
    };
  }
}
