import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Proof } from 'src/entity/proof.entity';
import { Score } from 'src/entity/score.entity';
import { Repository } from 'typeorm';
import { CreateProofInput } from './data/create-proof.input';
import { CreateProofOutput } from './data/create-proof.output';

@Injectable()
export class CreateProofService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Score) private readonly ScoreRepository: Repository<Score>,
        @InjectRepository(Proof) private readonly ProofRepository: Repository<Proof>,
    ) { }

    async create(createProofInput: CreateProofInput, file: Express.Multer.File) {

        // : Promise<CreateProofOutput>

        try {
            console.log(createProofInput.file);
            
            // const proof = await this.userRepository.save(createProofInput);
        } catch (error) {
            
        }
    }
}
