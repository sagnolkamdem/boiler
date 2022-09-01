import { Controller, Get, Query, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { GetAllProofOutput } from './data/get-all-proof.output';
import { GetAllProofService } from './get-all-proof.service';

@Controller('proof')
export class GetAllProofController {

    proofs = [];

    constructor(
        private readonly getAllProofService: GetAllProofService,
    ) { }

    @Get()
    async find(@Query() query: any): Promise<GetAllProofOutput> {
        console.log(query);
        
        // const proof = await this.getAllProofService.find();

        // let i = 0;
        // while(i < proof.length) {
        //     this.proofs.push(proof[i]);
        //     i++
        // }

        // let j = 0;
        // while(j < this.proofs.length) {
        //     this.proofs[j].file = join(process.cwd(), this.proofs[j].file);
        //     j++;
        // }

        // console.log(process.cwd());

        // return this.proofs;

        return this.getAllProofService.find(query.userId, query.id);
    }
}
