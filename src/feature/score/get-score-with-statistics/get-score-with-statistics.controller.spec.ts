import { Test, TestingModule } from '@nestjs/testing';
import { GetScoreWithStatisticsController } from './get-score-with-statistics.controller';

describe('GetScoreWithStatisticsController', () => {
  let controller: GetScoreWithStatisticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetScoreWithStatisticsController],
    }).compile();

    controller = module.get<GetScoreWithStatisticsController>(GetScoreWithStatisticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
