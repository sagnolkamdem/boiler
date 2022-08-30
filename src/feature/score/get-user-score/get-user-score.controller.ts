import { Controller, Get, Param } from '@nestjs/common';
import { GetUserScoreOutput } from './data/get-user-score.output';
import { GetUserScoreService } from './get-user-score.service';

@Controller('score')
export class GetUserScoreController {

    constructor(
        private readonly getUserScoreService: GetUserScoreService,
    ) { }

    @Get(':userId')
    find(@Param('userId') userId: string): Promise<GetUserScoreOutput> {
        return this.getUserScoreService.find(userId);
    }
}
