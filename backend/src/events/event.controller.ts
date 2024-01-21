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
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
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
    @Param() arg: {startDate: string, endDate: string}
  ): Promise<Event[]> {
    return this.eventService.findByWeek(arg);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(
    @Body() createEventDto: CreateEventDto,
  ): Promise<Event> {
    return this.eventService.create(createEventDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Event> {
    return this.eventService.findById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async removeById(@Param('id', ParseUUIDPipe) id: string) {
    const event = await this.eventService.findById(id);
    return this.eventService.removeById(id);
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
