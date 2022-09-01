import { Test, TestingModule } from '@nestjs/testing';
import { TreatProofService } from './treat-proof.service';

describe('TreatProofService', () => {
  let service: TreatProofService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreatProofService],
    }).compile();

    service = module.get<TreatProofService>(TreatProofService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
