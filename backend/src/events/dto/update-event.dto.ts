import { IsString,IsBoolean, IsDateString, IsOptional, IsArray } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  abonement: string;

  @IsOptional()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsArray()
  comments: string[];

  @IsBoolean()
  @IsOptional()
  done: boolean;

  @IsOptional()
  @IsString()
  color: string;
}
