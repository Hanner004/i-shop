import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROUTESCONTROLLERS } from '../index.routes';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDTO } from 'src/utils/dto/input/invoices';

@ApiTags('invoices')
@Controller({ path: ROUTESCONTROLLERS.INVOICES })
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post('/create-invoice/:clientId')
  async createInvoice(
    @Param('clientId', ParseUUIDPipe) clientId: string,
    @Body() data: CreateInvoiceDTO,
  ) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'invoice created',
      data: await this.invoicesService.createInvoice(clientId, data),
    };
  }

  @Get('/get-invoices')
  async getInvoices() {
    return {
      statusCode: HttpStatus.OK,
      message: 'invoices found',
      data: await this.invoicesService.getInvoices(),
    };
  }

  @Get('/get-invoice-of-client/:clientId')
  async getInvoiceOfClient(@Param('clientId', ParseUUIDPipe) clientId: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'invoice of client found',
      data: await this.invoicesService.getInvoiceOfClient(clientId),
    };
  }
}
