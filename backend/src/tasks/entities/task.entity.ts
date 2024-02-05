import { Entity, Column } from 'typeorm';
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

@Entity()
export class Task extends BaseEntity {
  @Column()
  @IsNotEmpty()
  @IsEnum(EVENT_TYPE)
  type: EVENT_TYPE;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @Column('text', { array: true })
  @IsArray()
  comments: string[] = [];

  @Column()
  @IsBoolean()
  done: boolean = false;

  @Column()
  @IsString()
  color: string = 'var(--color-orange-2)';
}
