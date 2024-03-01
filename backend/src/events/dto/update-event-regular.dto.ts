import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateEventRegularDto {
  @IsOptional()
  @IsString()
  abonement: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsNumber()
  weekDay: number;

  @IsOptional()
  @IsNumber()
  startHours: number;

  @IsOptional()
  @IsNumber()
  startMinutes: number;

  @IsOptional()
  @IsNumber()
  endHours: number;

  @IsOptional()
  @IsNumber()
  endMinutes: number;
}
