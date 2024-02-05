import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Client } from 'src/clients/entities/client.entity';
import { ClientService } from 'src/clients/client.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Client])],
  controllers: [EventController],
  providers: [EventService, ClientService],
})
export class EventModule {}
