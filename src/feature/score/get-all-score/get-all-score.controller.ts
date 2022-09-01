import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
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

    
    // @UseGuards(JwtAuthGuard)
    @Get()
    find(@Query() query: any): Promise<GetAllScoreOutput> {
        return this.getAllScoreService.find(query.userId, query.startDate, query.endDate);
    }
}
