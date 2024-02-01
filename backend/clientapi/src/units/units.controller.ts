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
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Unit } from './entities/unit.entity';
import { PoliciesGuard } from '../policy/policy.guard';
import { Action } from '../casl/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from '../policy/policy.decorator';

@Controller('units')
@UseGuards(PoliciesGuard)
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Create, Unit))
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitsService.create(createUnitDto);
  }

  @Get()
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Read, Unit))
  findAll() {
    return this.unitsService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Read, Unit))
  findOne(@Param('id') id: string) {
    return this.unitsService.findOne(+id);
  }

  @Patch(':id')
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Update, Unit))
  update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
    return this.unitsService.update(+id, updateUnitDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Delete, Unit))
  remove(@Param('id') id: string) {
    return this.unitsService.remove(+id);
  }
}
