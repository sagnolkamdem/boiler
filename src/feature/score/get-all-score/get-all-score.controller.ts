import { Controller, Get } from '@nestjs/common';
import { GetAllScoreOutput } from './data/get-all-score.input';
import { GetAllScoreService } from './get-all-score.service';

@Controller('score')
export class GetAllScoreController {

    constructor(
        private readonly getAllScoreService: GetAllScoreService,
    ) {}

    @Get()
    find(): Promise<GetAllScoreOutput> {
        return this.getAllScoreService.find();
    }
}
