import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TreatProofInput } from './data/treat-proof.input';
import { TreatProofOutput } from './data/treat-proof.output';
import { TreatProofService } from './treat-proof.service';

@Controller('treatProof')
export class TreatProofController {

    constructor(
        private readonly treatProofService: TreatProofService,
    ) { }

    @ApiTags('proof')
    @ApiBearerAuth()
    @Patch(':id')
    update(@Param('id') id: string, @Body() treatProofInput: TreatProofInput): Promise<TreatProofOutput> {
        return this.treatProofService.update(id, treatProofInput);
    }

}
