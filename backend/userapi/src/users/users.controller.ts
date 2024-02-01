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
@UseGuards(PoliciesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Create, User))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Read, User))
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Read, User))
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Update, User))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: PureAbility) => ability.can(Action.Delete, User))
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
