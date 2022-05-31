import { EntityRepository, Repository } from 'typeorm';
import { Client } from 'src/database/entities';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {}
