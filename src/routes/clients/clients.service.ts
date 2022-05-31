import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientRepository } from 'src/database/repositories';
import { CreateClientDTO, UpdateClientDTO } from 'src/utils/dto';

@Injectable()
export class ClientsService {
  constructor(private clientRepository: ClientRepository) {}

  async createClient(data: CreateClientDTO) {
    const clientFound = await this.clientRepository.findOne({
      where: { email: data.email },
    });
    if (clientFound) throw new ConflictException('email already exists');
    return await this.clientRepository.save(this.clientRepository.create(data));
  }

  async getClients() {
    return await this.clientRepository.find();
  }

  async getClient(clientId: string) {
    const clientFound = await this.clientRepository.findOne({
      where: { id: clientId },
    });
    if (!clientFound) throw new NotFoundException('client not found');
    return clientFound;
  }

  async updateClient(clientId: string, data: UpdateClientDTO) {
    const clientFound = await this.clientRepository.findOne({
      where: { id: clientId },
    });
    if (!clientFound) throw new NotFoundException('client not found');
    return await this.clientRepository.save({ ...clientFound, ...data });
  }

  async deleteClient(clientId: string) {
    const clientFound = await this.clientRepository.findOne({
      where: { id: clientId },
    });
    if (!clientFound) throw new NotFoundException('client not found');
    return await this.clientRepository.delete(clientFound);
  }
}
