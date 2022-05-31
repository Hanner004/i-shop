import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientRepository } from 'src/database/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([ClientRepository])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
