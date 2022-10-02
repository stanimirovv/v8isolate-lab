import { Injectable } from '@nestjs/common';
import { LoggerService } from './lib/logger/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly logger: LoggerService) {}

  getHello(): string {
    this.logger.debug('Hello world!');
    return 'Hello World!';
  }
}
