import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proof } from 'src/entity/proof.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllProofService {

    constructor(
        // @InjectRepository(User) private readonly userRepository: Repository<User>,
        // @InjectRepository(Score) private readonly scoreRepository: Repository<Score>,
        @InjectRepository(Proof) private readonly proofRepository: Repository<Proof>,
    ) { }

    find() {
        return this.proofRepository.find();
    }

    
}
