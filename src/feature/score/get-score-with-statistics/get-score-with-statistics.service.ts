import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Score } from 'src/entity/score.entity';
import { ScoreStatus } from 'src/enum/scoreStatus.enum';
import { Between, Repository } from 'typeorm';
import { getScoreStatisticOutput } from './data/get-score-stat.output';

@Injectable()
export class GetScoreWithStatisticsService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Score) private readonly scoreRepository: Repository<Score>,
    ) { }


    async getScore(query: any): Promise<getScoreStatisticOutput> {
        if (!query.startDate || !query.endDate) {
            return {
                message: 'Please provide start and end dates.',
                statusCode: 404,
                data: null
            }
        }

        // const data = await this.userRepository.findAndCount({
        //     where: {
        //         scores: {
        //             createdAtOfServer: Between(query.startDate, query.endDate),
        //             status: ScoreStatus.ABSENT,
        //         },
        //     },
        //     relations: {
        //         scores: true,
        //     }
        // })

        const data = await this.scoreRepository.findAndCount({
            where: {
                createdAtOfServer: Between(query.startDate, query.endDate),
                status: ScoreStatus.ABSENT,
            },
            relations: {
                user: true,
            },
        })

        return {
            message: 'server',
            statusCode: 200,
            data
        }


    }
}
