import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateScoreService } from './create-score.service';
import { CreateScoreInput } from './data/create-score.input';
import { CreateScoreOutput } from './data/create-score.output';

@Controller('score')
export class CreateScoreController {
  constructor(private readonly createScoreService: CreateScoreService) {}

  @ApiBearerAuth()
  @ApiTags('score')
  @Post()
  async create(
    @Body() createScoreInput: CreateScoreInput,
  ): Promise<CreateScoreOutput> {
    return await this.createScoreService.create(createScoreInput);
  }
}
