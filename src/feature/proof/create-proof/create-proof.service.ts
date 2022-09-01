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
        @InjectRepository(Score) private readonly scoreRepository: Repository<Score>,
        @InjectRepository(Proof) private readonly proofRepository: Repository<Proof>,
    ) { }

    async create(createProofInput: CreateProofInput, file: Express.Multer.File): Promise<CreateProofOutput> {

        console.log(createProofInput);
        

        try {
            createProofInput.file ? createProofInput.file = file.path : null;
            
            await this.proofRepository.save(createProofInput);

            return {
                message: "Proof successfully created",
                statusCode: 201,
            }
        } catch (error) {
            console.log(error);
            
            return {
                message: "An error occurred",
                statusCode: 500,
            }
        }
    }
}
