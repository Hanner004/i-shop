import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Invoice, Product } from '../../entities';

@Entity()
export class Detail extends BaseEntity {
  @Column()
  quantity: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.details, { onDelete: 'CASCADE' })
  invoice: Invoice;

  @ManyToOne(() => Product, (product) => product.details, { onDelete: 'CASCADE' })
  product: Product;
}
