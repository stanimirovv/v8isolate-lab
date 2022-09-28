import { Test, TestingModule } from '@nestjs/testing';
import { IsolateService } from './isolate.service';

describe('IsolateService', () => {
  let service: IsolateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IsolateService],
    }).compile();

    service = module.get<IsolateService>(IsolateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
