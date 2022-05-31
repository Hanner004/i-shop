import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Client, Detail } from '../../entities';

@Entity()
export class Invoice extends BaseEntity {
  @ManyToOne(() => Client, (client) => client.invoices, { onDelete: 'CASCADE' })
  client: Client;

  @OneToMany(() => Detail, (detail) => detail.invoice, { onDelete: 'CASCADE' })
  details: Detail[];
}
