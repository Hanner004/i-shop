import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Detail } from '../../entities';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @OneToMany(() => Detail, (detail) => detail.product, { onDelete: 'CASCADE' })
  details: Detail[];
}
