import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { UsersService } from 'src/users/users.service';
import { Between, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    // private usersService: UsersService,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({
      // relations: {
      //   owner: true,
      // },
    });
  }

  async findByWeek(arg): Promise<Event[]> {
    const {startDate, endDate} = arg;
    const start = new Date(startDate);
    const end = new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1));
    return this.eventRepository.find({
      // relations: {
      //   owner: true,
      // },
      where: {
        startDate: Between(
          start,
          end,
        )
      }
    });
  }

  async findById(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: {
        id: id,
      },
      // relations: {
      //   owner: true,
      // },
    });
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  async create(
    createEventDto: CreateEventDto,
    // username: string,
  ): Promise<Event> {
    // const user = await this.eventRepository.findOne(username);
    // const newEvent = this.eventRepository.create({
    //   ...createWishListDto,
    //   owner: user,
    // });
    const newEvent = this.eventRepository.create({
      ...createEventDto
    });
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
}
