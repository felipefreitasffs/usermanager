import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PureAbility } from '@casl/ability';
import { ClientsService } from './clients.service';
import { PoliciesGuard } from '../policy/policy.guard';
import { Action } from '../casl/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from '../policy/policy.decorator';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('client')
@Controller('clients')
@UseGuards(PoliciesGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Create, 'Client'))
  create(@Body() createClientDto: Prisma.ClientCreateInput) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Read, 'Client'))
  findAll(@Query('skip') skip?: string, @Query('take') take?: string) {
    return this.clientsService.findAll({
      skip: +skip || undefined,
      take: +take || undefined,
    });
  }

  @Get(':id')
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Read, 'Client'))
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne({ id: +id });
  }

  @Patch(':id')
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Update, 'Client'))
  update(
    @Param('id') id: string,
    @Body() updateClientDto: Prisma.ClientUpdateInput,
  ) {
    return this.clientsService.update({
      where: { id: +id },
      data: updateClientDto,
    });
  }

  @Delete(':id')
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Delete, 'Client'))
  remove(@Param('id') id: string) {
    return this.clientsService.remove({ id: +id });
  }
}
