import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class UpdateClientsPaymentsDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  amount: string;
}
