import {
  IsNotEmpty,
  IsString,
  Length,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsArray,
} from 'class-validator';
import { PAYMENT_TYPE } from 'src/types/types';

export class CreateClientsPaymentsDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  amount: string;

  @IsNotEmpty()
  @IsEnum(PAYMENT_TYPE)
  type: PAYMENT_TYPE;

  @IsNotEmpty()
  @IsString()
  clientId: string;
}
