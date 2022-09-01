import { Body, Controller, Param, Patch } from '@nestjs/common';
import { AddProofService } from './add-proof.service';
import { AddProofInput } from './data/add-proof.input';
import { AddProofOutPut } from './data/add-proof.output';

@Controller('addProof')
export class AddProofController {

    constructor(
        private readonly addProofService: AddProofService,
    ) {}

    @Patch(':proofId')
    update(@Param('proofId') proofId: string, @Body() addProofInput: AddProofInput): Promise<AddProofOutPut> {
        return this.addProofService.update(proofId, addProofInput);
    }
}