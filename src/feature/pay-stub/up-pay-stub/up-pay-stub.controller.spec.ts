import { Test, TestingModule } from '@nestjs/testing';
import { UpPayStubController } from './up-pay-stub.controller';

describe('UpPayStubController', () => {
  let controller: UpPayStubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpPayStubController],
    }).compile();

    controller = module.get<UpPayStubController>(UpPayStubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
