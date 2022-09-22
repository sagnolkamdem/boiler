import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Proof } from 'src/entity/proof.entity';
import { ProofStatus } from 'src/enum/proofStatus.enum';
import { Equal, Not, Repository } from 'typeorm';
import { TreatProofInput } from './data/treat-proof.input';
import { TreatProofOutput } from './data/treat-proof.output';

@Injectable()
export class TreatProofService {

    constructor(
        @InjectRepository(Proof) private readonly proofRepository: Repository<Proof>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async update(id: string, treatProofInput: TreatProofInput): Promise<TreatProofOutput> {
        console.log(treatProofInput.treatBy.toString());
        
        try {
            
            const user = await this.userRepository.findOneBy({
                id: treatProofInput.treatBy.toString(),
            });

            if (!user) {
                return {
                    message: "Couldn't find a user to treat proof",
                    statusCode: 400,
                    proof: null,
                }
            }

            const proof = await this.proofRepository.findOne({
                where: {
                    id,
                }
            });

            if (!proof || proof.status == ProofStatus.APPROVED) {
                let message: string;
                !proof ? message = "Couldn't find a proof" : message = "This proof is already approved!";
                return {
                    message,
                    statusCode: 400,
                    proof: null,
                } 
            }

            await this.proofRepository.update(id, treatProofInput);

            return {
                message: "Successfully updated proof!",
                statusCode: 200,
                proof: await this.proofRepository.findOneBy({id: proof.id})
            }

        } catch (error) {
            console.log(error);
            
            return {
                message: "An error occurred",
                statusCode: 500,
                proof: null
            }
        }
    }
}
