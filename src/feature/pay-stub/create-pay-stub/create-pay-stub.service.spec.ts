import { Test, TestingModule } from '@nestjs/testing';
import { CreatePayStubService } from './create-pay-stub.service';

describe('CreatePayStubService', () => {
  let service: CreatePayStubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePayStubService],
    }).compile();

    service = module.get<CreatePayStubService>(CreatePayStubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
