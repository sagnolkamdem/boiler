import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateScoreService } from './create-score.service';
import { CreateScoreInput } from './data/create-score.input';
import { CreateScoreOutput } from './data/create-score.output';

@Controller('score')
export class CreateScoreController {

    constructor(
        private readonly createScoreService: CreateScoreService,
    ) { }

    @Post()
    async create(@Body() createScoreInput: CreateScoreInput): Promise<CreateScoreOutput> { 
        return await this.createScoreService.create(createScoreInput);
    }
}
