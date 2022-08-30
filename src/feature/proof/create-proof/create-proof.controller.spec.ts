import { Test, TestingModule } from '@nestjs/testing';
import { CreateProofController } from './create-proof.controller';

describe('CreateProofController', () => {
  let controller: CreateProofController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateProofController],
    }).compile();

    controller = module.get<CreateProofController>(CreateProofController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
