import { Test, TestingModule } from '@nestjs/testing';
import { GetBadScoreController } from './get-bad-score.controller';

describe('GetBadScoreController', () => {
  let controller: GetBadScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetBadScoreController],
    }).compile();

    controller = module.get<GetBadScoreController>(GetBadScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
