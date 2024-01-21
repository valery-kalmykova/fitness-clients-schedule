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
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('clients')
  // @UseGuards(JwtAuthGuard)
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(
    @Body() createClientDto: CreateClientDto,
  ): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Client> {
    return this.clientService.findById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async removeById(@Param('id', ParseUUIDPipe) id: string) {
    const event = await this.clientService.findById(id);
    return this.clientService.removeById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async updateById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() UpdateEventDto: UpdateClientDto,
  ) {
    return this.clientService.updateById(id, UpdateEventDto);
  }
}
