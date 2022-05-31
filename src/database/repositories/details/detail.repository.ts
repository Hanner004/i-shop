import { EntityRepository, Repository } from 'typeorm';
import { Detail } from 'src/database/entities';

@EntityRepository(Detail)
export class DetailRepository extends Repository<Detail> {}
