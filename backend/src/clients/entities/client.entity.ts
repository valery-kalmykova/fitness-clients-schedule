import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base.entity';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsArray,
  IsNumber,
} from 'class-validator';

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

  @Column('text', { array: true })
  @IsArray()
  health: string[] = [];

  @Column()
  @IsString()
  color: string = 'var(--color-orange-2)';
}
