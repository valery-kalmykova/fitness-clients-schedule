import { IsNotEmpty, IsString, IsDateString, IsOptional, IsEnum, IsArray, IsBoolean } from 'class-validator';
import { EVENT_TYPE } from 'src/types/types';

export class CreateEventDto {
  @IsNotEmpty()
  @IsEnum(EVENT_TYPE)
  type: EVENT_TYPE;

  @IsNotEmpty()
  @IsString()
  abonement: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date;

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
