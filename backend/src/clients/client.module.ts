import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Event } from 'src/events/entities/event.entity';
import { EventService } from 'src/events/event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Event])],
  controllers: [ClientController],
  providers: [ClientService, EventService],
})
export class ClientModule {}
