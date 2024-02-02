import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, CaslAbilityFactory],
  imports: [PrismaModule],
})
export class ClientsModule {}
