import { Test, TestingModule } from '@nestjs/testing';
import { GetAllScoreController } from './get-all-score.controller';

describe('GetAllScoreController', () => {
  let controller: GetAllScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllScoreController],
    }).compile();

    controller = module.get<GetAllScoreController>(GetAllScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
