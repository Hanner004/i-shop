import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROUTESCONTROLLERS } from '../index.routes';
import { ClientsService } from './clients.service';
import { CreateClientDTO, UpdateClientDTO } from 'src/utils/dto';

@ApiTags('clients')
@Controller({ path: ROUTESCONTROLLERS.CLIENTS })
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('/create-client')
  async createClient(@Body() data: CreateClientDTO) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'client created',
      data: await this.clientsService.createClient(data),
    };
  }

  @Get('/get-clients')
  async getClients() {
    return {
      statusCode: HttpStatus.OK,
      message: 'clients found',
      data: await this.clientsService.getClients(),
    };
  }

  @Get('/get-client/:clientId')
  async getClient(@Param('clientId', ParseUUIDPipe) clientId: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'client found',
      data: await this.clientsService.getClient(clientId),
    };
  }

  @Put('/update-client/:clientId')
  async updateClient(
    @Param('clientId', ParseUUIDPipe) clientId: string,
    @Body() data: UpdateClientDTO,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'client updated',
      data: await this.clientsService.updateClient(clientId, data),
    };
  }

  @Delete('/delete-client/:clientId')
  async deleteClient(@Param('clientId', ParseUUIDPipe) clientId: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'client deleted',
      data: await this.clientsService.deleteClient(clientId),
    };
  }
}
