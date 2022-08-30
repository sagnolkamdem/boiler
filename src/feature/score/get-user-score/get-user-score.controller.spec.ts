import { Test, TestingModule } from '@nestjs/testing';
import { GetUserScoreController } from './get-user-score.controller';

describe('GetUserScoreController', () => {
  let controller: GetUserScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetUserScoreController],
    }).compile();

    controller = module.get<GetUserScoreController>(GetUserScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
