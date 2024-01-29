import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [UsersModule, CaslModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
