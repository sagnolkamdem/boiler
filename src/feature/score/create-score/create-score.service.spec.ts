import { Test, TestingModule } from '@nestjs/testing';
import { CreateScoreService } from './create-score.service';

describe('CreateScoreService', () => {
  let service: CreateScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateScoreService],
    }).compile();

    service = module.get<CreateScoreService>(CreateScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
