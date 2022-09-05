import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream } from 'fs';
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

    async find(userId?: string, id?: string) {
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

                
                if (proof.file) {
                    let a : any = proof.file;
                    a = new StreamableFile(createReadStream(join(process.cwd(),proof.file)));
                    proof.file = a;
                }
    
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
                        if (user.proofsCreatedBy[j].file) {
                            let a : any = user.proofsCreatedBy[j].file;
                            a = new StreamableFile(createReadStream(join(process.cwd(), user.proofsCreatedBy[j].file)));
                            user.proofsCreatedBy[j].file = a;
                        }
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
                while( j< user?.proofsCreatedBy?.length ) {
                    if (user.proofsCreatedBy[j]?.file) {

                        let a : any = user?.proofsCreatedBy[j]?.file;
                        a = new StreamableFile(createReadStream(join(process.cwd(), user.proofsCreatedBy[j].file)));
                        user.proofsCreatedBy[j].file = a;
                    }
                    j++;
                }
    
                return {
                    message: "All proofs successfully retrieved.",
                    statusCode: 200,
                    data: user
                }

            }

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
                if (proofs[j].file) {
                    let a : any = proofs[j].file;
                    a = new StreamableFile(createReadStream(join(process.cwd(), proofs[j].file)));
                    proofs[j].file = a;
                    console.log(proofs[j].file);
                }
                j++;
            }
            
            
            return {
                message: "All proofs successfully retrievedd.",
                statusCode: 200,
                data: proofs
            }
            
        } catch (error) {
            console.log(error);
            
            return {
                message: "An error occurred, please check if the data you are transmitting is correct and retry!",
                statusCode: 500,
                data: null,
            }
        }
    }

    
}
