import { IsNotEmpty, IsString, Length, IsBoolean, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { EVENT_TYPE } from 'src/types/types';

export class CreateEventDto {
  @IsNotEmpty()
  @IsEnum(EVENT_TYPE)
  type: EVENT_TYPE;

  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  title: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsString()
  color: string;
}
