import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Client, Product } from '../../entities';

@Entity()
export class Invoice extends BaseEntity {
  @Column()
  quantity: number;

  @ManyToOne(() => Client, (client) => client.invoices, {
    onDelete: 'CASCADE',
  })
  client: Client;

  @ManyToOne(() => Product, (product) => product.invoices, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
