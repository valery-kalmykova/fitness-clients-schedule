import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { ClientService } from 'src/clients/client.service';
import { Client } from 'src/clients/entities/client.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private clientService: ClientService,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({
      // relations: {
      //   owner: true,
      // },
    });
  }

  async findByWeek(arg): Promise<Event[]> {
    const { startDate, endDate } = arg;
    const start = new Date(startDate);
    const end = new Date(
      new Date(endDate).setDate(new Date(endDate).getDate() + 1),
    );
    return this.eventRepository.find({
      // relations: {
      //   owner: true,
      // },
      where: {
        startDate: Between(start, end),
      },
      relations: {
        client: true,
      },
    });
  }

  async findById(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        client: true,
      },
    });
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const { clientId, ...rest } = createEventDto;
    const client = await this.clientService.findById(clientId);
    const newEvent = this.eventRepository.create({
      ...rest,
      client: client,
    });
    const { id } = await this.eventRepository.save(newEvent);
    const savedEvent = await this.findById(id)
    return savedEvent;
  }

  async createMass(createEventDto: CreateEventDto): Promise<Event> {
    const { clientId, startDate, endDate } = createEventDto;
    const client = await this.clientService.findById(clientId);
    let date = new Date(startDate);
    let endTime = new Date(endDate);
    const yearLastDate = new Date(`${date.getFullYear() + 1}-01-01`);
    const headEvent = await this.createEventforMass(
      createEventDto,
      date,
      endTime,
      client,
    );
    headEvent.related_to = headEvent.id;
    let teleatedId = headEvent.id;
    await this.eventRepository.save(headEvent);
    endTime.setDate(date.getDate() + 7);
    date.setDate(date.getDate() + 7);
    while (date < yearLastDate) {
      await this.createEventforMass(
        createEventDto,
        date,
        endTime,
        client,
        teleatedId,
      );
      endTime.setDate(date.getDate() + 7);
      date.setDate(date.getDate() + 7);
    }
    const { id } = headEvent;
    const returnedEvent = await this.findById(id)
    return returnedEvent;
  }

  async createEventforMass(
    createEventDto: CreateEventDto,
    date: Date,
    endTime: Date,
    client: Client,
    relatedId?: string,
  ): Promise<Event> {
    const { clientId, startDate, endDate, ...rest } = createEventDto;
    const newEvent = this.eventRepository.create({
      ...rest,
      startDate: date,
      endDate: endTime,
      client: client,
    });
    if (relatedId) {
      newEvent.related_to = relatedId;
    }
    await this.eventRepository.save(newEvent);
    return newEvent;
  }

  async updateById(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const result = await this.eventRepository
      .createQueryBuilder()
      .update(Event)
      .set({
        ...updateEventDto,
      })
      .where('id = :id', { id: id })
      .returning('*')
      .updateEntity(true)
      .execute();
    return result.raw[0];
  }

  async removeById(id: string) {
    return this.eventRepository.delete({ id });
  }

  async removeAllRelated(relatedId: string): Promise<string> {
    const releatedEvents = await this.eventRepository.find({
      where: {
        related_to: relatedId
      }
    });
    releatedEvents.map(async (event: Event) => {
      const { id } = event;
      await this.eventRepository.delete({id})
    })
    return "All related events removed"
  }

  async removeAllFutureRelated(relatedId: string, id: string): Promise<string> {
    const releatedEvents = await this.eventRepository.find({
      where: {
        related_to: relatedId
      }
    });
    const startEvent = await this.eventRepository.findOne({
      where: {
        id: id,
      },
    })
    const { startDate } = startEvent;
    releatedEvents.map(async (event: Event) => {
      if (event.startDate >= startDate) {
        const { id } = event;
        await this.eventRepository.delete({id})
      }      
    })
    return "All future related events removed"
  }
}
