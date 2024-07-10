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
import { UnitsService } from './units.service';
import { PoliciesGuard } from '../policy/policy.guard';
import { Action } from '../casl/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from '../policy/policy.decorator';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('unit')
@Controller('units')
@UseGuards(PoliciesGuard)
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Create, 'Unit'))
  create(@Body() createUnitDto: Prisma.UnitCreateInput) {
    return this.unitsService.create(createUnitDto);
  }

  @Get()
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Read, 'Unit'))
  findAll(@Query('skip') skip?: string, @Query('take') take?: string) {
    return this.unitsService.findAll({
      skip: +skip || undefined,
      take: +take || undefined,
    });
  }

  @Get(':id')
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Read, 'Unit'))
  findOne(@Param('id') id: string) {
    return this.unitsService.findOne({ id: +id });
  }

  @Patch(':id')
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Update, 'Unit'))
  update(
    @Param('id') id: string,
    @Body() updateUnitDto: Prisma.UnitUpdateInput,
  ) {
    return this.unitsService.update({
      where: { id: +id },
      data: updateUnitDto,
    });
  }

  @Delete(':id')
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Delete, 'Unit'))
  remove(@Param('id') id: string) {
    return this.unitsService.remove({ id: +id });
  }
}
