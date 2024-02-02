import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnitsModule } from './units/units.module';
import { ClientsModule } from './clients/clients.module';
import { CaslModule } from './casl/casl.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UnitsModule, ClientsModule, CaslModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
