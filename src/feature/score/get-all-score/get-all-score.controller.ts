import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Period } from 'src/enum/period.enum';
import { JwtAuthGuard } from 'src/feature/auth/auth/jwt-auth.guard';
import { GetAllScoreOutput } from './data/get-all-score.output';
import { QueryInput } from './data/query.input';
import { GetAllScoreService } from './get-all-score.service';

@Controller('score')
export class GetAllScoreController {

    constructor(
        private readonly getAllScoreService: GetAllScoreService,
    ) {}

    
    @ApiTags('score')
    @ApiBearerAuth()
    @ApiParam({
        name: 'id',
        description: 'Id of score',
        required: false
    })
    @ApiParam({
        name: 'startDate',
        description: 'The date to start getting scores from',
        required: false
    })
    @ApiParam({
        name: 'endDate',
        description: 'The date to end getting scores from. that value is required when you enter the start date',
        required: false
    })
    @Get()
    find(@Query() query: any): Promise<GetAllScoreOutput> {
        console.log(query);
        
        return this.getAllScoreService.find(query.id, query.startDate, query.endDate);
    }
}
