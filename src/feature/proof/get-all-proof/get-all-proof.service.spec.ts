import { Test, TestingModule } from '@nestjs/testing';
import { GetAllProofService } from './get-all-proof.service';

describe('GetAllProofService', () => {
  let service: GetAllProofService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllProofService],
    }).compile();

    service = module.get<GetAllProofService>(GetAllProofService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
