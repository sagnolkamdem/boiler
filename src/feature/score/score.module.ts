import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Score } from 'src/entity/score.entity';
import { CreateScoreService } from './create-score/create-score.service';
import { CreateScoreController } from './create-score/create-score.controller';
import { GetAllScoreController } from './get-all-score/get-all-score.controller';
import { GetAllScoreService } from './get-all-score/get-all-score.service';
import { GetUserScoreController } from './get-user-score/get-user-score.controller';
import { GetUserScoreService } from './get-user-score/get-user-score.service';
import { AddProofController } from './add-proof/add-proof.controller';
import { AddProofService } from './add-proof/add-proof.service';
import { Proof } from 'src/entity/proof.entity';
import { GetScoreStatisticsController } from './get-score-statistics/get-score-statistics.controller';
import { GetScoreStatisticsService } from './get-score-statistics/get-score-statistics.service';
import { ConfigModule } from '@nestjs/config';
import { GetScoreWithStatisticsController } from './get-score-with-statistics/get-score-with-statistics.controller';
import { GetScoreWithStatisticsService } from './get-score-with-statistics/get-score-with-statistics.service';
import { GetBadScoreService } from './get-bad-score/get-bad-score.service';
import { GetBadScoreController } from './get-bad-score/get-bad-score.controller';
import { CountDate } from 'src/entity/startDate.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Score, Proof, CountDate]),
        ConfigModule
    ],
    providers: [CreateScoreService, GetAllScoreService, GetUserScoreService, AddProofService, GetScoreStatisticsService, GetScoreWithStatisticsService, GetBadScoreService],
    controllers: [CreateScoreController, GetAllScoreController, GetUserScoreController, AddProofController, GetScoreStatisticsController, GetScoreWithStatisticsController, GetBadScoreController],
})
export class ScoreModule {}
