/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { CountDate } from 'src/entity/startDate.entity';
import { ScoreStatus } from 'src/enum/scoreStatus.enum';
import { Between, Like, MoreThan, Not, Raw, Repository } from 'typeorm';
import { GetBadScoreOutput } from './data/get-bad-score.output';

@Injectable()
export class GetBadScoreService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(CountDate) private readonly dateRepository: Repository<CountDate>,
    ) { }

    async getBadScore(query: any): Promise<GetBadScoreOutput> {
        try {
            let start, end;

            if (query.startDate ) {
                if (!query.endDate) {
                    return {
                        message: "You need to specify a start date and end date!",
                        statusCode: 400,
                        data: null,
                    };
                }
                start = query.startDate;
                end = query.endDate;
            } else {
                const startDateV2 = await this.dateRepository.findOne({
                    select: {
                        startDate: true,
                    },
                    where: {
                        id: '3ea33c4a-27a3-48b4-b5aa-e5fe0f6eefe8'
                    }
                })
                start = startDateV2.startDate;
            }

            

            if (query.userId) {
                let user = await this.userRepository.findOne({
                    where: {
                        id: query.userId,
                        scores: {
                            createdAtOfServer: Raw((alias) => `${alias} > :date`, { date: start }),
                            status: query.status ?? Not(ScoreStatus.ONTIME),
                        }
                    },
                    relations: {
                        scores: true,
                    }
                });
                if (end) {
                    user = await this.userRepository.findOne({
                        where: {
                            id: query.userId,
                            scores: {
                                createdAtOfServer: Raw((alias) => `${alias} > :start_date AND ${alias} < :end_date`, { start_date: start, end_date: end }),
                                status: query.status ?? Not(ScoreStatus.ONTIME),
                            }
                        },
                        relations: {
                            scores: true,
                        }
                    });
                }
    
                return {
                    message: "Data of that user successfully retrieved",
                    statusCode: 200,
                    data: user,
                };
            } else {
                let users = await this.userRepository.find({
                    where: {
                        scores: {
                            createdAtOfServer: Raw((alias) => `${alias} > :date`, { date: start }),
                            status: query.status ?? Not(ScoreStatus.ONTIME),
                        }
                    },
                    relations: {
                        scores: true,
                    }
                });

                if (end) {
                     users = await this.userRepository.find({
                        where: {
                            scores: {
                                createdAtOfServer: Raw((alias) => `${alias} > :date`, { date: start }),
                                createdAtOfServer: Raw((alias) => `${alias} < :date`, { date: end }),
                                status: query.status ?? Not(ScoreStatus.ONTIME),
                            }
                        },
                        relations: {
                            scores: true,
                        }
                    });
                }
    
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
