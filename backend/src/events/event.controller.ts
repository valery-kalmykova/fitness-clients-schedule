import {
  Body,
  Controller,
  UseGuards,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseUUIDPipe,
  Request,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EVENT_TYPE } from 'src/types/types';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('event')
// @UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':startDate/:endDate')
  findByWeek(
    @Param() arg: { startDate: string; endDate: string },
  ): Promise<Event[]> {
    return this.eventService.findByWeek(arg);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Event> {
    return this.eventService.findById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(
    @Body() createEventDto: CreateEventDto,
    @Request() req,
  ): Promise<Event | string> {
    const repeat = req.query.repeat;
    if (repeat === 'yes') {
      return this.eventService.createMass(createEventDto);
    } else {
      return this.eventService.createEvent(createEventDto);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async removeById(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventService.removeById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/all-related/:relatedId')
  async removeAllRelated(@Param('relatedId', ParseUUIDPipe) relatedId: string) {
    return this.eventService.removeAllRelated(relatedId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/all-future-related/:id/:relatedId')
  async removeAllFutereRelated(
    @Param() arg: { relatedId: string; id: string },
  ) {
    return this.eventService.removeAllFutureRelated(arg.relatedId, arg.id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async updateById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() UpdateEventDto: UpdateEventDto,
  ) {
    return this.eventService.updateById(id, UpdateEventDto);
  }
}
