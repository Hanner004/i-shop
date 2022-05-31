import { EntityRepository, Repository } from 'typeorm';
import { Product } from 'src/database/entities';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
