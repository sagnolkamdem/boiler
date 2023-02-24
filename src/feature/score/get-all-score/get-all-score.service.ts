import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Score } from 'src/entity/score.entity';
import { ProofStatus } from 'src/enum/proofStatus.enum';
import { ScoreStatus } from 'src/enum/scoreStatus.enum';
import { ScoreType } from 'src/enum/scoreType.enum';
import { Between, Equal, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { GetAllScoreOutput } from './data/get-all-score.output';

@Injectable()
export class GetAllScoreService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
  ) {}

  async find(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<GetAllScoreOutput> {
    try {
      if (startDate && !userId) {
        if (!endDate) {
          return {
            message: 'Please select an end date',
            statusCode: 404,
            data: null,
          };
        }

        const user = await this.userRepository.find({
          where: {
            // Check if the current user is an administrator
            // role: Role.ADMIN,
            scores: {
              createdAtOfServer: Between(startDate, endDate),
            },
          },
          relations: {
            scores: true,
            // proofsCreatedBy: true,
          },
        });

        return {
          message: 'Data successfully retrieved',
          statusCode: 200,
          data: user,
        };
      }

      if (userId) {
        if (startDate) {
          if (!endDate) {
            return {
              message: 'Please select an end date',
              statusCode: 404,
              data: null,
            };
          }

          const user = await this.userRepository.find({
            where: {
              id: userId,
              scores: {
                createdAtOfServer: Between(startDate, endDate),
              },
            },
            relations: {
              scores: true,
              // proofsCreatedBy: true,
            },
          });

          return {
            message: 'Data successfully retrieved',
            statusCode: 200,
            data: user,
          };
        }

        const user = await this.userRepository.find({
          where: {
            id: userId,
          },
          relations: {
            scores: true,
            // proofsCreatedBy: true,
          },
        });

        return {
          message: 'Data successfully retrieved',
          statusCode: 200,
          data: user,
        };
      }

      const user = await this.userRepository.find({
        relations: {
          scores: true,
          // proofsCreatedBy: true,
        },
      });

      return {
        message: 'Data successfully retrieved',
        statusCode: 200,
        data: user,
      };
    } catch (error) {
      console.log(error);

      return {
        message: 'An error occurred',
        statusCode: 500,
        data: null,
      };
    }
  }

  async usersScanned(userId, startDate: Date, endDate: Date): Promise<any> {
    try {
      if (startDate && !userId) {
        if (!endDate) {
          return {
            message: 'Please select an end date',
            statusCode: 404,
            data: null,
          };
        }

        const presence = await this.userRepository.find({
          where: {
            scores: {
              createdAtOfServer: Between(startDate, endDate),
              type: ScoreType.EVENING_SCAN,
            },
          },
          relations: {
            scores: true,
          },
        });

        const absence = await this.userRepository.find({
          where: {
            scores: {
              status: ScoreStatus.ABSENT,
              createdAtOfServer: Between(startDate, endDate),
              type: ScoreType.EVENING_SCAN,
            },
          },
          relations: {
            scores: true,
          },
        });

        return {
          message: 'Data successfully retrieved',
          statusCode: 200,
          data: {
            presence,
            absence,
          },
        };
      }

      if (userId) {
        if (startDate) {
          if (!endDate) {
            return {
              message: 'Please select an end date',
              statusCode: 404,
              data: null,
            };
          }

          const presence = await this.userRepository.find({
            where: {
              id: userId,
              scores: {
                createdAtOfServer: Between(startDate, endDate),
                type: ScoreType.EVENING_SCAN,
              },
            },
            relations: {
              scores: true,
            },
          });

          const absence = await this.userRepository.find({
            where: {
              id: userId,
              scores: {
                status: ScoreStatus.ABSENT,
                createdAtOfServer: Between(startDate, endDate),
                type: ScoreType.EVENING_SCAN,
              },
            },
            relations: {
              scores: true,
            },
          });

          return {
            message: 'Data successfully retrieved',
            statusCode: 200,
            data: {
              presence,
              absence,
            },
          };
        }

        const user = await this.userRepository.find({
          where: {
            id: userId,
          },
          relations: {
            scores: true,
            // proofsCreatedBy: true,
          },
        });

        return {
          message: 'Data successfully retrieved',
          statusCode: 200,
          data: user,
        };
      }

      const presence = await this.userRepository.find({
        where: {
          scores: {
            type: ScoreType.EVENING_SCAN,
          },
        },
        relations: {
          scores: true,
        },
      });

      const absence = await this.userRepository.find({
        where: {
          scores: {
            status: ScoreStatus.ABSENT,
            type: ScoreType.EVENING_SCAN,
          },
        },
        relations: {
          scores: true,
        },
      });

      return {
        message: 'Data successfully retrieved',
        statusCode: 200,
        data: {
          presence,
          absence,
        },
      };
    } catch (error) {
      return {
        message: 'An error occurred',
        statusCode: 500,
        data: null,
      };
    }
  }
}
