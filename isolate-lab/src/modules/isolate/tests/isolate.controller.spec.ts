import { Test, TestingModule } from '@nestjs/testing';
import { IsolateController } from '../isolate.controller';

describe('IsolateController', () => {
  let controller: IsolateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IsolateController],
    }).compile();

    controller = module.get<IsolateController>(IsolateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
