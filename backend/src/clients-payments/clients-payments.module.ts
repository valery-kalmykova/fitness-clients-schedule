import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsPayments } from './entities/clients-payments.entity';
import { ClientsPaymentsController } from './clients-payments.controller';
import { ClientsPaymentsService } from './clients-payments.service';
import { ClientService } from 'src/clients/client.service';
import { Client } from 'src/clients/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientsPayments, Client])],
  controllers: [ClientsPaymentsController],
  providers: [ClientService, ClientsPaymentsService],
})
export class ClientsPaymentsModule {}
