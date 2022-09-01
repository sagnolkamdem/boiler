import { Test, TestingModule } from '@nestjs/testing';
import { AddProofController } from './add-proof.controller';

describe('AddProofController', () => {
  let controller: AddProofController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddProofController],
    }).compile();

    controller = module.get<AddProofController>(AddProofController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
