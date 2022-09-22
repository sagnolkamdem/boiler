import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetScoreStatisticsOutput } from './data/get-score-statistics.output';
import { GetScoreStatisticsService } from './get-score-statistics.service';

@Controller('scoreStatistics')
export class GetScoreStatisticsController {

    constructor(
        private readonly getScoreStatisticsService: GetScoreStatisticsService,
    ) { }

    @Get()
    @ApiTags('score')
    @ApiBearerAuth()
    @ApiParam({
        name: 'startDate',
        description: 'the date to start the score statistics!',
        required: true,
    })
    @ApiParam({
        name: 'endDate',
        description: 'the date to end the score statistics. YOU NEED TO ADD +1 ON THE END DATE!',
        required: true,
    })
    @ApiParam({
        name: 'userId',
        description: 'The id of the user',
        required: false,
    })
    find(@Query() query: any): Promise<GetScoreStatisticsOutput> {
        console.log(query);
        
        return this.getScoreStatisticsService.find(query);
    }
}
