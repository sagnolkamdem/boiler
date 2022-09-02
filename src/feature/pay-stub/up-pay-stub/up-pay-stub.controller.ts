import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpPayStubInput } from './data/up-pay-stub.input';
import { UpPayStubOutput } from './data/up-pay-stub.output';
import { UpPayStubService } from './up-pay-stub.service';

@Controller('payStub')
export class UpPayStubController {

    constructor(
        private readonly UpPayStubService: UpPayStubService,
    ) { }

    @ApiTags('payStub')
    @ApiBearerAuth()
    @Patch(':id')
    update(@Param('id') id: string, @Body() upPayStubInput: UpPayStubInput): Promise<UpPayStubOutput> {
        return this.UpPayStubService.update(id, upPayStubInput);
    }
}
