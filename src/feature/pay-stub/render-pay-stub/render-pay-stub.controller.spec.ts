import { Test, TestingModule } from '@nestjs/testing';
import { RenderPayStubController } from './render-pay-stub.controller';

describe('RenderPayStubController', () => {
  let controller: RenderPayStubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RenderPayStubController],
    }).compile();

    controller = module.get<RenderPayStubController>(RenderPayStubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
