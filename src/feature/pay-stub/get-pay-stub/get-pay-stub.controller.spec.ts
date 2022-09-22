import { Test, TestingModule } from '@nestjs/testing';
import { GetPayStubController } from './get-pay-stub.controller';

describe('GetPayStubController', () => {
  let controller: GetPayStubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetPayStubController],
    }).compile();

    controller = module.get<GetPayStubController>(GetPayStubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
