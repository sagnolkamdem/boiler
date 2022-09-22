import { Test, TestingModule } from '@nestjs/testing';
import { CreatePayStubController } from './create-pay-stub.controller';

describe('CreatePayStubController', () => {
  let controller: CreatePayStubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatePayStubController],
    }).compile();

    controller = module.get<CreatePayStubController>(CreatePayStubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
