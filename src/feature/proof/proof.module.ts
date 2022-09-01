import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Proof } from 'src/entity/proof.entity';
import { Score } from 'src/entity/score.entity';
import { CreateProofController } from './create-proof/create-proof.controller';
import { CreateProofService } from './create-proof/create-proof.service';
import { ConfigModule } from '@nestjs/config';
import { GetAllProofController } from './get-all-proof/get-all-proof.controller';
import { GetAllProofService } from './get-all-proof/get-all-proof.service';
import { TreatProofController } from './treat-proof/treat-proof.controller';
import { TreatProofService } from './treat-proof/treat-proof.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Score, Proof])
  ],
  controllers: [CreateProofController, GetAllProofController, TreatProofController],
  providers: [CreateProofService, GetAllProofService, TreatProofService]
})
export class ProofModule {}
