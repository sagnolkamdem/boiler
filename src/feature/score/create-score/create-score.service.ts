import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Score } from 'src/entity/score.entity';
import { ScoreStatus } from 'src/enum/scoreStatus.enum';
import { Repository } from 'typeorm';
import { CreateScoreInput } from './data/create-score.input';
import { CreateScoreOutput } from './data/create-score.output';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CreateScoreService {

    private readonly logger = new Logger(CreateScoreService.name);

    userIdTab = [];
    scoreIdTab = [];

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Score) private readonly scoreRepository: Repository<Score>,
    ) { }

    async create(createScoreInput: CreateScoreInput): Promise<CreateScoreOutput> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: (createScoreInput.user).toString()
                },
            });
            const now = new Date();

            if (user) {

                const score = await this.scoreRepository.findOne({
                    where: {
                        createdAtDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
                        user: {
                            id: (createScoreInput.user).toString(),
                        },
                    },
                    relations: {
                        user: true,
                    }
                })
                
                // Condition about latitude
                const conditionOne: boolean = 4.88 > createScoreInput.latitude;
                const conditionTwo: boolean = 4.3 < createScoreInput.latitude;
                
                
                // Condition about longitude
                const conditionThree: boolean = 2.88 > createScoreInput.longitude;
                const conditionFour: boolean = 2.3 < createScoreInput.longitude;
                
                if ( conditionOne && conditionTwo && conditionThree && conditionFour) {
                    
                    if (!score) {
                        
                        // Set created score and updatedAt
                        createScoreInput.createdAtDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
                        createScoreInput.updatedAtDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;


                        createScoreInput.createdAtTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
                        createScoreInput.updatedAtTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

                        if (now.getHours() >= 9) {
                            createScoreInput.status = ScoreStatus.LATE;
                        } else {
                            createScoreInput.status = ScoreStatus.ONTIME;
                        }

                        const score = await this.scoreRepository.save(createScoreInput);

                        return {
                            message: "Score saved successfully",
                            statusCode: 201,
                            score: score,
                        }

                    } else {
                        return {
                            message: "You have already scanned",
                            statusCode: 400,
                            score: null,
                        }
                    }

                } else {
                    return {
                        message: "Score was not saved successfully because your position is invalid.",
                        statusCode: 400,
                        score: null,
                    }
                }


            } else {
                return {
                    message: "User not found",
                    statusCode: 404,
                    score: null,
                }
            }
        } catch (error) {
            console.log(error);
            
            return {
                    message: "An error occurred",
                    statusCode: 500,
                    score: null,
                }
        }
    }

    @Cron('0 0 17 * * 1-5')
    async handleCron() {
        try {
            const now = new Date();

            const userId = await this.userRepository.find({
                select: {
                    id: true,
                }
            })

            const score = await this.scoreRepository.find({
                where: {
                    createdAtDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
                },
                relations: {
                    user: true,
                },
            });

            let a = 0;
            while (a < score.length) {
                this.scoreIdTab.push(score[0]?.user?.id);
                a++;
            }

            let i = 0;
            while (i < userId.length) {
                this.userIdTab.push(userId[i].id);
                i++;
            }

            let j = 0;
            while (j < this.userIdTab.length) {
                if(this.scoreIdTab.includes(this.userIdTab[j])) {

                    // Check status of user

                } else {

                    const createScoreInput = {
                        user: await this.userRepository.findOneBy({id: this.userIdTab[j]}),
                        status: ScoreStatus.ABSENT,
                    };

                    await this.scoreRepository.save(createScoreInput);

                    console.log(this.userIdTab[j]);

                }

                j++;
            }

        } catch (error) {
            console.log(error);
        }
    }
}