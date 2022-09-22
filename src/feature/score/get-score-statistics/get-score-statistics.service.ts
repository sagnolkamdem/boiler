import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Score } from 'src/entity/score.entity';
import { ScoreStatus } from 'src/enum/scoreStatus.enum';
import { Between, Repository } from 'typeorm';
import { GetScoreStatisticsOutput } from './data/get-score-statistics.output';

@Injectable()
export class GetScoreStatisticsService {

    constructor(
        @InjectRepository(Score) private readonly scoreRepository: Repository<Score>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {  }

    async find(query: any): Promise<GetScoreStatisticsOutput> {

        if ( !query.startDate || !query.endDate ) {
            return {
                message: "You must enter the start date and the end date!",
                statusCode: 400,
                statistic: null
            }
        }

        try {


            if (query.userId) {

                const totalScoreOfInterval = await this.scoreRepository.count({
                    where: {
                        user: {
                            id: query.userId,
                        },
                        createdAtOfServer: Between( query.startDate , query.endDate ),
                    }
                });

                const presence = await this.scoreRepository.count({
                    where: {
                        user: {
                            id: query.userId,
                        },
                        status: ScoreStatus.ONTIME,
                        createdAtOfServer: Between( query.startDate , query.endDate ),
                    },
                })

                const absence = await this.scoreRepository.count({
                    where: {
                        user: {
                            id: query.userId,
                        },
                        status: ScoreStatus.ABSENT,
                        createdAtOfServer: Between( query.startDate , query.endDate ),
                    },
                })

                const late = await this.scoreRepository.count({
                    where: {
                        user: {
                            id: query.userId,
                        },
                        status: ScoreStatus.LATE,
                        createdAtOfServer: Between( query.startDate , query.endDate ),
                    },
                })

                return {
                    message: "Statistics successfully retrieved!",
                    statusCode: 200,
                    statistic: {
                        totalOfUser: 1,
                        presence,
                        absence,
                        late,
                        totalScoreOfInterval,
                    }
                }
                
            }



            const totalOfUser = await this.userRepository.count();

            const totalScoreOfInterval = await this.scoreRepository.count({
                where: {
                    createdAtOfServer: Between( query.startDate , query.endDate ),
                }
            });

            const presence = await this.scoreRepository.count({
                where: {
                    status: ScoreStatus.ONTIME,
                    createdAtOfServer: Between( query.startDate , query.endDate ),
                },
            })

            
            const absence = await this.scoreRepository.count({
                where: {
                    status: ScoreStatus.ABSENT,
                    createdAtOfServer: Between( query.startDate , query.endDate ),
                },
            })

            const late = await this.scoreRepository.count({
                where: {
                    status: ScoreStatus.LATE,
                    createdAtOfServer: Between( query.startDate , query.endDate ),
                },
            })

            return {
                message: "Statistics successfully retrieved!",
                statusCode: 200,
                statistic: {
                    totalOfUser,
                    presence,
                    absence,
                    late,
                    totalScoreOfInterval,
                }
            }
            
            
        } catch (error) {
            console.log(error);
            
            return {
                message: "An error occurred",
                statusCode: 500,
                statistic: null,
            }
        }

    }
}
