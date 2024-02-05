import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    // private usersService: UsersService,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findById(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        workoutList: true,
      },
    });
    if (!client) {
      throw new NotFoundException();
    }
    return client;
  }

  async create(
    createClientDto: CreateClientDto,
    // username: string,
  ): Promise<Client> {
    // const user = await this.eventRepository.findOne(username);
    // const newEvent = this.eventRepository.create({
    //   ...createWishListDto,
    //   owner: user,
    // });
    const newClient = this.clientRepository.create({
      ...createClientDto
    });
    await this.clientRepository.save(newClient);
    return newClient;
  }

  async updateById(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const result = await this.clientRepository
      .createQueryBuilder()
      .update(Client)
      .set({
        ...updateClientDto,
      })
      .where('id = :id', { id: id })
      .returning('*')
      .updateEntity(true)
      .execute();
    return result.raw[0];
  }

  async removeById(id: string) {
    return this.clientRepository.delete({ id });
  }
}
