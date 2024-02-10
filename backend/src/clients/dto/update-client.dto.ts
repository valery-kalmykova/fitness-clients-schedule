import { IsArray, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateClientDto {
  @IsOptional()
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
