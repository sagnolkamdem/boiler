import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proof } from 'src/entity/proof.entity';
import { Score } from 'src/entity/score.entity';
import { Repository } from 'typeorm';
import { AddProofInput } from './data/add-proof.input';
import { AddProofOutPut } from './data/add-proof.output';

@Injectable()
export class AddProofService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
    @InjectRepository(Proof)
    private readonly proofRepository: Repository<Proof>,
  ) {}

  async update(
    proofId: string,
    addProofInput: AddProofInput,
  ): Promise<AddProofOutPut> {
    if (addProofInput.score.length > 3) {
      return {
        message:
          'You cannot justify more than 3 scores with the system. Please see administration!',
        statusCode: 400,
      };
    }

    try {
      const proof = await this.proofRepository.findOneBy({ id: proofId });

      if (!proof) {
        return {
          message: 'Proof not found',
          statusCode: 400,
        };
      }

      let j = 0;
      while (j < addProofInput.score.length) {
        const score = await this.scoreRepository.findOne({
          where: {
            id: addProofInput.score[j],
          },
        });
        if (score) {
          await this.scoreRepository.update(score.id, {
            proof,
          });
        }
        j++;
      }

      return {
        message: 'Proof successfully added',
        statusCode: 200,
      };
    } catch (error) {
      return {
        message: 'An error occurred',
        statusCode: 500,
      };
    }
  }
}
