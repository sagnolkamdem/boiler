import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Period } from 'src/enum/period.enum';
import { GetPayStubOutput } from './data/get-pay-stub.output';
import { GetPayStubService } from './get-pay-stub.service';

@Controller('payStub')
export class GetPayStubController {

    constructor(
        private readonly getPayStubService: GetPayStubService,
    ) { }

    @ApiTags('payStub')
    @ApiBearerAuth()
    @Get(':userId')
    findOne(@Param('userId') userId: string, @Query('month') month: Period, @Query('year') year: string): Promise<GetPayStubOutput> {
        return this.getPayStubService.findOne(userId, month, year);
    }
}
