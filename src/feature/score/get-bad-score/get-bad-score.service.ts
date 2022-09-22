import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Score } from 'src/entity/score.entity';
import { ScoreStatus } from 'src/enum/scoreStatus.enum';
import { Between, Like, Not, Repository } from 'typeorm';
import { GetBadScoreOutput } from './data/get-bad-score.output';

@Injectable()
export class GetBadScoreService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Score) private readonly scoreRepository: Repository<Score>,
    ) { }

    async getBadScore(query: any): Promise<GetBadScoreOutput> {
        try {

            if (query.startDate && !query.endDate) {
                return {
                    message: "You need to specify a start date and end date!",
                    statusCode: 400,
                    data: null,
                };
            }

            if (query.userId) {
                const user = await this.userRepository.findOne({
                    where: {
                        id: query.userId,
                        scores: {
                            createdAtOfServer: Between(query.startDate, query.endDate),
                            status: Not(ScoreStatus.ONTIME),
                        }
                    },
                    relations: {
                        scores: true,
                    }
                });
    
                return {
                    message: "Data of that user successfully retrieved",
                    statusCode: 200,
                    data: user,
                };
            } else {
                const users = await this.userRepository.find({
                    where: {
                        scores: {
                            createdAtOfServer: Between(query.startDate, query.endDate),
                            status: Not(ScoreStatus.ONTIME),
                        }
                    },
                    relations: {
                        scores: true,
                    }
                });
    
                return {
                    message: "Data of all users successfully retrieved",
                    statusCode: 200,
                    data: users,
                };
            }
            
        } catch (error) {
            console.log(error);
            
            return {
                message: "An error occurred",
                statusCode: 500,
                data: null,
            };
        }
    }
}
