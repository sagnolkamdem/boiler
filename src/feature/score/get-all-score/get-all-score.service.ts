import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Score } from 'src/entity/score.entity';
import { ScoreStatus } from 'src/enum/scoreStatus.enum';
import { Repository } from 'typeorm';
import { GetAllScoreOutput } from './data/get-all-score.input';

@Injectable()
export class GetAllScoreService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Score) private readonly scoreRepository: Repository<Score>,
    ) { }

    async find(): Promise<GetAllScoreOutput> {
        try {
            const user = await this.userRepository.find({
                where: {
                    scores: {
                        status: ScoreStatus.LATE,
                    }
                },
                relations: {
                    scores: true,
                }
            })

            return {
                message: "Data successfully retrieved",
                statusCode: 200,
                data: user,
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
