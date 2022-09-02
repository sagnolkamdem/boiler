import { Controller, Get, Query, StreamableFile } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join } from 'path';
import { GetAllProofOutput } from './data/get-all-proof.output';
import { GetAllProofService } from './get-all-proof.service';

@Controller('proof')
export class GetAllProofController {

    constructor(
        private readonly getAllProofService: GetAllProofService,
    ) { }

    @ApiTags('proof')
    @ApiBearerAuth()
    @ApiParam({
        name: 'id',
        description: 'The proof id',
        required: false,
    })
    @ApiParam({
        name: 'userId',
        description: 'The user id',
        required: false,
    })
    @Get()
    async find(@Query() query: any): Promise<GetAllProofOutput> {

        return this.getAllProofService.find(query.userId, query.id);
    }
}