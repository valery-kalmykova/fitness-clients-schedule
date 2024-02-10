import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base.entity';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Event } from 'src/events/entities/event.entity';

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

  @Column()
  @IsNumber()
  weight: number = 0;

  @Column({ nullable: true })
  @IsString()
  health: string = null;

  @Column()
  @IsString()
  color: string = 'var(--color-orange-2)';

  @OneToMany(() => Event, (event) => event.client)
  @IsNotEmpty()
  @IsArray()
  workoutList: Event[];
}
