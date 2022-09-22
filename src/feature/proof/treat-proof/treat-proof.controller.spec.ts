import { Test, TestingModule } from '@nestjs/testing';
import { TreatProofController } from './treat-proof.controller';

describe('TreatProofController', () => {
  let controller: TreatProofController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreatProofController],
    }).compile();

    controller = module.get<TreatProofController>(TreatProofController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
