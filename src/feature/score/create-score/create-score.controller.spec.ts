import { Test, TestingModule } from '@nestjs/testing';
import { CreateScoreController } from './create-score.controller';

describe('CreateScoreController', () => {
  let controller: CreateScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateScoreController],
    }).compile();

    controller = module.get<CreateScoreController>(CreateScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
