import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Client } from 'src/clients/entities/client.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      // relations: {
      //   owner: true,
      // },
    });
  }

  async findByWeek(arg): Promise<Task[]> {
    const { startDate, endDate } = arg;
    const start = new Date(startDate);
    const end = new Date(
      new Date(endDate).setDate(new Date(endDate).getDate() + 1),
    );
    return this.taskRepository.find({
      // relations: {
      //   owner: true,
      // },
      where: {
        startDate: Between(start, end),
      },
    });
  }

  async findById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepository.create({
      ...createTaskDto,
    });
    await this.taskRepository.save(newTask);
    return newTask;
  }

  async updateById(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const result = await this.taskRepository
      .createQueryBuilder()
      .update(Task)
      .set({
        ...updateTaskDto,
      })
      .where('id = :id', { id: id })
      .returning('*')
      .updateEntity(true)
      .execute();
    return result.raw[0];
  }

  async removeById(id: string) {
    return this.taskRepository.delete({ id });
  }
}
