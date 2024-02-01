import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PureAbility } from '@casl/ability';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PoliciesGuard } from '../policy/policy.guard';
import { Client } from './entities/client.entity';
import { Action } from '../casl/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from '../policy/policy.decorator';

@Controller('clients')
@UseGuards(PoliciesGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Create, Client))
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Read, Client))
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Read, Client))
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Update, Client))
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Delete, Client))
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
