import { Test, TestingModule } from '@nestjs/testing';
import { GetAllScoreService } from './get-all-score.service';

describe('GetAllScoreService', () => {
  let service: GetAllScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllScoreService],
    }).compile();

    service = module.get<GetAllScoreService>(GetAllScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
