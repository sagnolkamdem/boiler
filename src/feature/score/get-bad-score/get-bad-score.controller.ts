import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetBadScoreOutput } from './data/get-bad-score.output';
import { GetBadScoreService } from './get-bad-score.service';

@Controller('bad-score')
export class GetBadScoreController {

    constructor(
        private getBadScoreService: GetBadScoreService,
    ) { }

    @ApiTags('score')
    @ApiBearerAuth()
    @ApiParam({
        name: 'userId',
        description: 'Id of user to get all scores of that user',
        required: false
    })
    @ApiParam({
        name: 'startDate',
        description: 'The date to start getting scores from',
        required: false
    })
    @ApiParam({
        name: 'status',
        description: 'absent or late or nothing',
        required: false
    })
    @ApiParam({
        name: 'endDate',
        description: 'The date to end getting scores from. that value is required when you enter the start date',
        required: false
    })
    @Get()
    getBadScore(@Query() query: any): Promise<GetBadScoreOutput> {
        
        return this.getBadScoreService.getBadScore(query);
    }
}
