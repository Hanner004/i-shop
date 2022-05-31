import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity()
export class Detail extends BaseEntity {
  @Column()
  quantity: number;
}
