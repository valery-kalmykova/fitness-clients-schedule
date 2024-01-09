import { IsNotEmpty, IsString, Length, IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @Length(1, 250)
  title: string;

  @IsOptional()
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
  comment: string

  @IsBoolean()
  @IsOptional()
  done: boolean;

  @IsOptional()
  @IsString()
  color: string;
}
