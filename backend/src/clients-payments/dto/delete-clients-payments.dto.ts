import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class DeleteClientsPaymentsDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  amount: string;
}
