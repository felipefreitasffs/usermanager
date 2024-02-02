import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';

@Module({
  controllers: [UnitsController],
  providers: [UnitsService, CaslAbilityFactory],
  imports: [PrismaModule],
})
export class UnitsModule {}
