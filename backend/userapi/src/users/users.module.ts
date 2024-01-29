import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CaslAbilityFactory],
})
export class UsersModule {}
