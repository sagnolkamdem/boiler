import { Test, TestingModule } from '@nestjs/testing';
import { GetScoreStatisticsService } from './get-score-statistics.service';

describe('GetScoreStatisticsService', () => {
  let service: GetScoreStatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetScoreStatisticsService],
    }).compile();

    service = module.get<GetScoreStatisticsService>(GetScoreStatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
