import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from 'src/entity/person.entity';
import { Proof } from 'src/entity/proof.entity';
import { ProofStatus } from 'src/enum/proofStatus.enum';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllProofService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        // @InjectRepository(Score) private readonly scoreRepository: Repository<Score>,
        @InjectRepository(Proof) private readonly proofRepository: Repository<Proof>,
    ) { }

    async find(userId: string, id: string) {
        try {

            if (id && !userId) {
                
                const proof = await this.proofRepository.findOne({
                    where: {
                        id,
                        status: ProofStatus.PENDING,
                    },
                    relations: {
                        concerns: true,
                    }
                })

                proof.file = join(process.cwd(), proof.file)
    
                return {
                    message: "Proof successfully retrieved.",
                    statusCode: 200,
                    data: proof
                }

            }

            if (userId) {

                if (id) {
                    
                    const user = await this.userRepository.findOne({
                        where: {
                            id: userId,
                            proofsCreatedBy: {
                                id: id,
                                status: ProofStatus.PENDING,
                            },
                        },
                        relations: {
                            proofsCreatedBy: true,
                        }
                    })

                    let j = 0;
                    while( j< user.proofsCreatedBy.length ) {
                        user.proofsCreatedBy[j].file = join(process.cwd(), user.proofsCreatedBy[j].file)
                        j++;
                    }
        
                    return {
                        message: "All proofs successfully retrieved.",
                        statusCode: 200,
                        data: user
                    }

                }
                
                const user = await this.userRepository.findOne({
                    where: {
                        id: userId,
                        proofsCreatedBy: {
                            status: ProofStatus.PENDING,
                        },
                    },
                    relations: {
                        proofsCreatedBy: true,
                    }
                })

                let j = 0;
                while( j< user.proofsCreatedBy.length ) {
                    user.proofsCreatedBy[j].file = join(process.cwd(), user.proofsCreatedBy[j].file)
                    j++;
                }
    
                return {
                    message: "All proofs successfully retrieved.",
                    statusCode: 200,
                    data: user
                }

            }

            // const users = await this.userRepository.find({
            //     relations: {
            //         proofsCreatedBy: true,
            //     },
            //     where: {
            //         proofsCreatedBy: {
            //             status: ProofStatus.PENDING,
            //         }
            //     },
            // })

            // let j = 0;
            // while( j< user.proofsCreatedBy.length ) {
            //     user.proofsCreatedBy[j].file = join(process.cwd(), user.proofsCreatedBy[j].file)
            //     j++;
            // }

            const proofs = await this.proofRepository.find({
                where: {
                    status: ProofStatus.PENDING,
                },
                relations: {
                    concerns: true,
                }
            })

            let j = 0;
            while( j< proofs.length ) {
                proofs[j].file = join(process.cwd(), proofs[j].file)
                j++;
            }

            return {
                message: "All proofs successfully retrievedd.",
                statusCode: 200,
                data: proofs
            }
            
        } catch (error) {
            return {
                message: "An error occurred, please check if the data you are transmitting is correct and retry!",
                statusCode: 500,
                data: null,
            }
        }
    }

    
}
