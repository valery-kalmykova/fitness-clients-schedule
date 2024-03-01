import {
  Body,
  Controller,
  UseGuards,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ClientsPaymentsService } from './clients-payments.service';
import { ClientsPayments } from './entities/clients-payments.entity';
import { DeleteClientsPaymentsDto } from './dto/delete-clients-payments.dto';
import { UpdateClientsPaymentsDto } from './dto/update-clients-payments.dto';
import { CreateClientsPaymentsDto } from './dto/create-clients-payments.dto';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('clients-payments')
// @UseGuards(JwtAuthGuard)
export class ClientsPaymentsController {
  constructor(private clientsPaymentsService: ClientsPaymentsService) {}

  @Get(':clientId')
  findAll(
    @Param('clientId', ParseUUIDPipe) clientId: string,
  ): Promise<ClientsPayments[]> {
    return this.clientsPaymentsService.findAll(clientId);
  }

  @Post('')
  create(
    @Body() CreateClientsPaymentsDto: CreateClientsPaymentsDto,
  ): Promise<{ totalIncomes: number; totalExpenses: number }> {
    return this.clientsPaymentsService.create(CreateClientsPaymentsDto);
  }

  @Delete(':id')
  async removeById(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientsPaymentsService.removeById(id);
  }

  @Delete()
  async removeDateAmount(
    @Body() deleteClientsPaymentsDto: DeleteClientsPaymentsDto,
  ) {
    return this.clientsPaymentsService.removeByDateAmount(
      deleteClientsPaymentsDto,
    );
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClientsPaymentsDto: UpdateClientsPaymentsDto,
  ) {
    return this.clientsPaymentsService.updateById(id, updateClientsPaymentsDto);
  }
}
