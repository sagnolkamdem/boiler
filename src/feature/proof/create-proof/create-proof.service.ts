import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proof } from 'src/entity/proof.entity';
import { Repository } from 'typeorm';
import { CreateProofInput } from './data/create-proof.input';
import { CreateProofOutput } from './data/create-proof.output';

@Injectable()
export class CreateProofService {
  constructor(
    @InjectRepository(Proof)
    private readonly proofRepository: Repository<Proof>,
  ) {}

  async create(
    createProofInput: CreateProofInput,
    file: Express.Multer.File,
  ): Promise<CreateProofOutput> {
    try {
      createProofInput.file ? (createProofInput.file = file.filename) : null;

      await this.proofRepository.save(createProofInput);

      return {
        message: 'Proof successfully created',
        statusCode: 201,
      };
    } catch (error) {
      console.log(error);

      return {
        message: 'An error occurred',
        statusCode: 500,
      };
    }
  }
}
