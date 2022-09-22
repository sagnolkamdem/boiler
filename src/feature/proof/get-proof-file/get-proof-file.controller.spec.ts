import { Test, TestingModule } from '@nestjs/testing';
import { GetProofFileController } from './get-proof-file.controller';

describe('GetProofFileController', () => {
  let controller: GetProofFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetProofFileController],
    }).compile();

    controller = module.get<GetProofFileController>(GetProofFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
