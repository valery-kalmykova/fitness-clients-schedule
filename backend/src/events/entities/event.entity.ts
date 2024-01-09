import { Entity, Column, ManyToOne } from 'typeorm';
// import { User } from 'src/users/entities/user.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsDateString,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { EVENT_TYPE } from 'src/types/types';

@Entity()
export class Event extends BaseEntity {
  @Column()
  @IsNotEmpty()
  @IsEnum(EVENT_TYPE)
  type: EVENT_TYPE;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  title: string;

  @Column()
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @Column({ nullable: true })
  @IsDateString()
  endDate: Date = null;

  @Column()
  @IsString()
  description: string = '';

  @Column()
  @IsString()
  comment: string = '';

  @Column()
  @IsBoolean()
  done: boolean = false;

  @Column()
  @IsString()
  color: string = 'var(--color-orange-2)';

  // @ManyToOne(() => User, (user) => user.wishes)
  // @IsNotEmpty()
  // owner: User;

  // @Column()
  // clients: Clients[]
}
