import { Test, TestingModule } from '@nestjs/testing';
import { GetPayStubService } from './get-pay-stub.service';

describe('GetPayStubService', () => {
  let service: GetPayStubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetPayStubService],
    }).compile();

    service = module.get<GetPayStubService>(GetPayStubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
