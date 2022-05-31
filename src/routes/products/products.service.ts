import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from 'src/database/repositories';
import { CreateProductDTO, UpdateProductDTO } from 'src/utils/dto';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(data: CreateProductDTO) {
    const productFound = await this.productRepository.findOne({
      where: { name: data.name },
    });
    if (productFound) throw new ConflictException('name already exists');
    return await this.productRepository.save(
      this.productRepository.create(data),
    );
  }

  async getProducts() {
    return await this.productRepository.find();
  }

  async getProduct(productId: string) {
    const productFound = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!productFound) throw new NotFoundException('product not found');
    return productFound;
  }

  async updateProduct(productId: string, data: UpdateProductDTO) {
    const productFound = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!productFound) throw new NotFoundException('product not found');
    return await this.productRepository.save({
      ...productFound,
      ...data,
    });
  }

  async deleteProduct(productId: string) {
    const productFound = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!productFound) throw new NotFoundException('product not found');
    return await this.productRepository.delete({ id: productId });
  }
}
