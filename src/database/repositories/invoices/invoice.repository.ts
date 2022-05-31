import { EntityRepository, Repository } from 'typeorm';
import { Invoice } from 'src/database/entities';

@EntityRepository(Invoice)
export class InvoiceRepository extends Repository<Invoice> {}
