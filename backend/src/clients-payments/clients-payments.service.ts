import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteClientsPaymentsDto } from './dto/delete-clients-payments.dto';
import { UpdateClientsPaymentsDto } from './dto/update-clients-payments.dto';
import { ClientsPayments } from './entities/clients-payments.entity';
import { ClientService } from 'src/clients/client.service';
import { CreateClientsPaymentsDto } from './dto/create-clients-payments.dto';
import { PAYMENT_TYPE } from 'src/types/types';

@Injectable()
export class ClientsPaymentsService {
  constructor(
    @InjectRepository(ClientsPayments)
    private clientsPaymentsRepository: Repository<ClientsPayments>,
    private clientService: ClientService,
  ) {}

  async findAll(clientId: string): Promise<ClientsPayments[]> {
    return this.clientsPaymentsRepository.find({
      where: {
        client: {
          id: clientId,
        },
      },
    });
  }

  async create(
    createClientsPaymentsDto: CreateClientsPaymentsDto,
  ): Promise<{ totalIncomes: number; totalExpenses: number }> {
    const { clientId, ...rest } = createClientsPaymentsDto;
    const client = await this.clientService.findById(clientId);
    const payment = this.clientsPaymentsRepository.create({
      ...rest,
    });
    payment.client = client;
    await this.clientsPaymentsRepository.save(payment);
    let expenses = await this.clientsPaymentsRepository.find({
      where: {
        type: PAYMENT_TYPE.expense,
        client: {
          id: clientId,
        },
      },
    });
    let totalExpenses = expenses.reduce(
      (acc, item) => acc + Number(item.amount),
      0,
    );
    let incomes = await this.clientsPaymentsRepository.find({
      where: {
        type: PAYMENT_TYPE.income,
        client: {
          id: clientId,
        },
      },
    });
    let totalIncomes = incomes.reduce(
      (acc, item) => acc + Number(item.amount),
      0,
    );
    return { totalIncomes: totalIncomes, totalExpenses: totalExpenses };
  }

  async updateById(
    id: string,
    updateClientsPaymentsDto: UpdateClientsPaymentsDto,
  ): Promise<ClientsPayments> {
    const result = await this.clientsPaymentsRepository
      .createQueryBuilder()
      .update(ClientsPayments)
      .set({
        ...updateClientsPaymentsDto,
      })
      .where('id = :id', { id: id })
      .returning('*')
      .updateEntity(true)
      .execute();
    return result.raw[0];
  }

  async removeById(id: string) {
    return this.clientsPaymentsRepository.delete({ id });
  }

  async removeByDateAmount(deleteClientsPaymentsDto: DeleteClientsPaymentsDto) {
    const { date, amount } = deleteClientsPaymentsDto;
    const payment = await this.clientsPaymentsRepository.findOne({
      where: {
        date: date,
        amount: amount,
      },
    });
    const { id } = payment;
    return this.clientsPaymentsRepository.delete({ id });
  }
}
