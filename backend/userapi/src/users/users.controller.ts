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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PoliciesGuard } from '../policy/policy.guard';
import { CheckPolicies } from '../policy/policy.decorator';
import { PureAbility } from '@casl/ability';
import { Action } from '../casl/casl-ability.factory/casl-ability.factory';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Create, User))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Read, User))
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Read, User))
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Update, User))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Delete, User))
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
