import { Test, TestingModule } from '@nestjs/testing';
import { RenderPayStubService } from './render-pay-stub.service';

describe('RenderPayStubService', () => {
  let service: RenderPayStubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RenderPayStubService],
    }).compile();

    service = module.get<RenderPayStubService>(RenderPayStubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
