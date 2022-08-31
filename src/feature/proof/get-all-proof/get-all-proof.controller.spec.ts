import { Test, TestingModule } from '@nestjs/testing';
import { GetAllProofController } from './get-all-proof.controller';

describe('GetAllProofController', () => {
  let controller: GetAllProofController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllProofController],
    }).compile();

    controller = module.get<GetAllProofController>(GetAllProofController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
