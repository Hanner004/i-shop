import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Invoice } from '../../entities';

@Entity()
export class Client extends BaseEntity {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @OneToMany(() => Invoice, (invoice) => invoice.client, { onDelete: 'CASCADE' })
  invoices: Invoice[];
}
