import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Score } from 'src/entity/score.entity';
import { ScoreStatus } from 'src/enum/scoreStatus.enum';
import { Not, Repository } from 'typeorm';
import { GetUserScoreOutput } from './data/get-user-score.output';

@Injectable()
export class GetUserScoreService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Score) private readonly scoreRepository: Repository<Score>,
    ) { }

    async find(userId: string): Promise<GetUserScoreOutput> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: userId,
                    scores: {
                        status: Not(ScoreStatus.ONTIME),
                    }
                },
                relations: {
                    scores: true,
                }
            })

            if (user) {
                return {
                    message: "Score successfully retrieved",
                    statusCode: 200,
                    user: user
                }
            } else {
                return {
                    message: "User not found",
                    statusCode: 400,
                    user: null
                }
            }
        } catch (error) {
            return {
                message: "An error occurred",
                statusCode: 500,
                user: null
            }
        }
    }
}
