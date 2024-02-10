import { IsNotEmpty, IsString, Length, IsBoolean, IsDateString, IsOptional, IsEnum, IsNumber, IsArray } from 'class-validator';
import { EVENT_TYPE } from 'src/types/types';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsDateString()
  age: Date;

  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsString()
  health: string;

  @IsOptional()
  @IsString()
  color: string;
}
