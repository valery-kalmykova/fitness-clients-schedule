import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate } from 'class-validator';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
