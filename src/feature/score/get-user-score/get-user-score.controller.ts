import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUserScoreOutput } from './data/get-user-score.output';
import { GetUserScoreService } from './get-user-score.service';

@Controller('score')
export class GetUserScoreController {
  constructor(private readonly getUserScoreService: GetUserScoreService) {}

  @ApiTags('score')
  @ApiBearerAuth()
  @Get(':userId')
  find(@Param('userId') userId: string): Promise<GetUserScoreOutput> {
    return this.getUserScoreService.find(userId);
  }
}
