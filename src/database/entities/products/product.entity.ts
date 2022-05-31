import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Invoice } from '../../entities';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @OneToMany(() => Invoice, (invoice) => invoice.product, {
    onDelete: 'CASCADE',
  })
  invoices: Invoice[];
}
