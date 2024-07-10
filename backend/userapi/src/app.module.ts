import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CaslModule } from './casl/casl.module';
import { ConfigModule } from '@nestjs/config';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [UsersModule, CaslModule, ConfigModule.forRoot(), GroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
