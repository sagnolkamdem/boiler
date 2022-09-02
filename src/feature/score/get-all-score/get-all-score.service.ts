import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Score } from 'src/entity/score.entity';
import { ProofStatus } from 'src/enum/proofStatus.enum';
import { ScoreStatus } from 'src/enum/scoreStatus.enum';
import { Between, Equal, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { GetAllScoreOutput } from './data/get-all-score.output';

@Injectable()
export class GetAllScoreService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Score) private readonly scoreRepository: Repository<Score>,
    ) { }

    async find(id: string, startDate: Date, endDate: Date): Promise<GetAllScoreOutput> {

        console.log(id);
        
        try {

            if (startDate && !id) {

                if (!endDate) {
                    return {
                        message: 'Please select an end date',
                        statusCode: 404,
                        data: null
                    }
                }

                const scores = await this.scoreRepository.find({
                    where: {
                        createdAtOfServer: Between(startDate, endDate),
                    },
                    relations: {
                        user: true,
                    }
                })
    
                return {
                    message: "Data successfully retrieved",
                    statusCode: 200,
                    data: scores,
                };

            }


            if (id) {



                if (startDate) {

                    if (!endDate) {
                        return {
                            message: 'Please select an end date',
                            statusCode: 404,
                            data: null
                        }
                    }

                    const score = await this.scoreRepository.findOne({
                        where: {
                            id: id,
                            createdAtOfServer: Between(startDate, endDate),
                        },
                        relations: {
                            user: true,
                        }
                    })
        
                    return {
                        message: "Data successfully retrieved",
                        statusCode: 200,
                        data: score,
                    };

                }

                const score = await this.scoreRepository.findOne({
                    where: {
                        id: id,
                    },
                    relations: {
                        user: true,
                    }
                });

                return {
                    message: "Data successfully retrieved",
                    statusCode: 200,
                    data: score,
                };
            }

            console.log("ok");

            const scores = await this.scoreRepository.find({
                relations: {
                    user: true,
                }
            });

            return {
                message: "Data successfully retrieved",
                statusCode: 200,
                data: scores,
            };

        } catch (error) {
            return {
                message: "An error occurred",
                statusCode: 500,
                data: null,
            }
        }
    }
}
