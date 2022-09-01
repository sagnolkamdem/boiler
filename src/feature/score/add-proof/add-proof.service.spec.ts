import { Test, TestingModule } from '@nestjs/testing';
import { AddProofService } from './add-proof.service';

describe('AddProofService', () => {
  let service: AddProofService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddProofService],
    }).compile();

    service = module.get<AddProofService>(AddProofService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
