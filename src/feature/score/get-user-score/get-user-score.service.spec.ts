import { Test, TestingModule } from '@nestjs/testing';
import { GetUserScoreService } from './get-user-score.service';

describe('GetUserScoreService', () => {
  let service: GetUserScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserScoreService],
    }).compile();

    service = module.get<GetUserScoreService>(GetUserScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
