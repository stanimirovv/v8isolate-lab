import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import dbConfig from './lib/database/database.config';
import { LoggerService } from './lib/logger/logger.service';
import { IsolateModule } from './modules/isolate/isolate.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig as any), IsolateModule, UserModule],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
