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

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Score])
    ],
    providers: [CreateScoreService, GetAllScoreService, GetUserScoreService],
    controllers: [CreateScoreController, GetAllScoreController, GetUserScoreController],
})
export class ScoreModule {}
