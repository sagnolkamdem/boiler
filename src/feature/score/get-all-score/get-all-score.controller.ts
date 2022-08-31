import { Controller, Get, Query, Req } from '@nestjs/common';
import { Period } from 'src/enum/period.enum';
import { GetAllScoreOutput } from './data/get-all-score.output';
import { QueryInput } from './data/query.input';
import { GetAllScoreService } from './get-all-score.service';

@Controller('score')
export class GetAllScoreController {

    constructor(
        private readonly getAllScoreService: GetAllScoreService,
    ) {}
    // : Promise<GetAllScoreOutput>
    @Get()
    find(@Query() query: any) {
        return this.getAllScoreService.find(query.userId, query.startDate, query.endDate);
    }
}
