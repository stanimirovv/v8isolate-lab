import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IsolateModule } from './modules/isolate/isolate.module';

@Module({
  imports: [IsolateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
