import { Module } from '@nestjs/common';
import { IsolateController } from './isolate.controller';
import { IsolateService } from './isolate.service';

@Module({
  controllers: [IsolateController],
  providers: [IsolateService]
})
export class IsolateModule {}
