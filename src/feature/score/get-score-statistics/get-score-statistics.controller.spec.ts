import { Test, TestingModule } from '@nestjs/testing';
import { GetScoreStatisticsController } from './get-score-statistics.controller';

describe('GetScoreStatisticsController', () => {
  let controller: GetScoreStatisticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetScoreStatisticsController],
    }).compile();

    controller = module.get<GetScoreStatisticsController>(GetScoreStatisticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
