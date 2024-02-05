import { IsString, IsBoolean, IsDateString, IsOptional, IsArray } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsDateString()
  startDate: Date;

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
