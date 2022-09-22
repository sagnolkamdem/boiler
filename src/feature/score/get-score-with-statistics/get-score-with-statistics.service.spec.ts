import { Test, TestingModule } from '@nestjs/testing';
import { GetScoreWithStatisticsService } from './get-score-with-statistics.service';

describe('GetScoreWithStatisticsService', () => {
  let service: GetScoreWithStatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetScoreWithStatisticsService],
    }).compile();

    service = module.get<GetScoreWithStatisticsService>(GetScoreWithStatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
