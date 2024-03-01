import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { IsNotEmpty, IsDateString, IsNumber, IsEnum } from 'class-validator';
import { Client } from 'src/clients/entities/client.entity';
import { PAYMENT_TYPE } from 'src/types/types';

@Entity()
export class ClientsPayments extends BaseEntity {
  @Column()
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  amount: string;

  @Column()
  @IsNotEmpty()
  @IsEnum(PAYMENT_TYPE)
  type: PAYMENT_TYPE;

  @ManyToOne(() => Client, (client) => client.payments)
  client: Client;
}
