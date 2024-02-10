import { Entity, Column, ManyToOne } from 'typeorm';
// import { User } from 'src/users/entities/user.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsBoolean,
  IsEnum,
  IsArray,
} from 'class-validator';
import { EVENT_TYPE } from 'src/types/types';
import { Client } from 'src/clients/entities/client.entity';

@Entity()
export class Event extends BaseEntity {
  @Column()
  @IsNotEmpty()
  @IsEnum(EVENT_TYPE)
  type: EVENT_TYPE;

  @Column()
  @IsNotEmpty()
  @IsString()
  abonement: string;

  @Column()
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @Column({ nullable: true })
  @IsDateString()
  endDate: Date = null;

  @Column('text', { array: true })
  @IsArray()
  comments: string[] = [];

  @Column()
  @IsBoolean()
  done: boolean = false;

  @Column()
  @IsString()
  color: string = 'var(--color-orange-2)';

  @ManyToOne(() => Client, (client) => client.workoutList)
  client: Client;

  @Column({nullable: true})
  @IsString()
  related_to: string = null;
}
