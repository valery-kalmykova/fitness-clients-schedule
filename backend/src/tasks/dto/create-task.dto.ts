import { IsNotEmpty, IsString, IsDateString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { EVENT_TYPE } from 'src/types/types';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsEnum(EVENT_TYPE)
  type: EVENT_TYPE;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsArray()
  comments: string[];

  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  clientId: string
}
