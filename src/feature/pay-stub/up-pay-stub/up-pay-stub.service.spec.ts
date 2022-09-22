import { Test, TestingModule } from '@nestjs/testing';
import { UpPayStubService } from './up-pay-stub.service';

describe('UpPayStubService', () => {
  let service: UpPayStubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpPayStubService],
    }).compile();

    service = module.get<UpPayStubService>(UpPayStubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
