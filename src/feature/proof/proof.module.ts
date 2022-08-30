import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Proof } from 'src/entity/proof.entity';
import { Score } from 'src/entity/score.entity';
import { CreateProofController } from './create-proof/create-proof.controller';
import { CreateProofService } from './create-proof/create-proof.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Score, Proof])
  ],
  controllers: [CreateProofController],
  providers: [CreateProofService]
})
export class ProofModule {}
