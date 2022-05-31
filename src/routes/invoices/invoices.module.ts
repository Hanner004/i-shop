import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import {
  ClientRepository,
  InvoiceRepository,
  ProductRepository,
} from 'src/database/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientRepository,
      InvoiceRepository,
      ProductRepository,
    ]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
