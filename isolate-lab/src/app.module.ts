import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IsolateModule } from './modules/isolate/isolate.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [IsolateModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
