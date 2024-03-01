import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base.entity';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsArray,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { Event } from 'src/events/entities/event.entity';
import { ClientsPayments } from 'src/clients-payments/entities/clients-payments.entity';

@Entity()
export class Client extends BaseEntity {
  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsString()
  phone: string;

  @Column({ nullable: true })
  @IsDateString()
  age: Date = null;

  @Column({ nullable: true })
  @IsNumber()
  weight: number = null;

  @Column({ nullable: true })
  @IsString()
  health: string = null;

  @Column()
  @IsString()
  color: string;

  @OneToMany(() => Event, (event) => event.client)
  @IsNotEmpty()
  @IsArray()
  workoutList: Event[];

  @OneToMany(() => ClientsPayments, (payment) => payment.client)
  @IsNotEmpty()
  @IsArray()
  payments: ClientsPayments[];

  @Column()
  @IsBoolean()
  archive: boolean = false;
}
