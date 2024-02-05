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
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { EVENT_TYPE } from 'src/types/types';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('task')
  // @UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }
  
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':startDate/:endDate')
  findByWeek(
    @Param() arg: {startDate: string, endDate: string}
  ): Promise<Task[]> {
    return this.taskService.findByWeek(arg);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.taskService.findById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async removeById(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.removeById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async updateById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() UpdateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateById(id, UpdateTaskDto);
  }
}
