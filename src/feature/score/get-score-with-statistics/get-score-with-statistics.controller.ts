import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetScoreWithStatisticsService } from './get-score-with-statistics.service';

@Controller('getScore')
export class GetScoreWithStatisticsController {
  constructor(
    private getScoreWithStatisticsService: GetScoreWithStatisticsService,
  ) {}

  @Get()
  getScore(@Query() query: any): Promise<any> {
    return this.getScoreWithStatisticsService.getScore(query);
  }
}
