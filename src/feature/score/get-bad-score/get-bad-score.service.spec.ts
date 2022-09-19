import { Test, TestingModule } from '@nestjs/testing';
import { GetBadScoreService } from './get-bad-score.service';

describe('GetBadScoreService', () => {
  let service: GetBadScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetBadScoreService],
    }).compile();

    service = module.get<GetBadScoreService>(GetBadScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
