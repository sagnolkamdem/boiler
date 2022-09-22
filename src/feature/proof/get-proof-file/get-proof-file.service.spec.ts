import { Test, TestingModule } from '@nestjs/testing';
import { GetProofFileService } from './get-proof-file.service';

describe('GetProofFileService', () => {
  let service: GetProofFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetProofFileService],
    }).compile();

    service = module.get<GetProofFileService>(GetProofFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
