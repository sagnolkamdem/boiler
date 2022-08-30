import { Test, TestingModule } from '@nestjs/testing';
import { CreateProofService } from './create-proof.service';

describe('CreateProofService', () => {
  let service: CreateProofService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateProofService],
    }).compile();

    service = module.get<CreateProofService>(CreateProofService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
