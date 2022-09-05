import { Controller, Get, Param, Query, Res, StreamableFile } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join, resolve } from 'path';
import { GetProofFileService } from '../get-proof-file/get-proof-file.service';
import { GetAllProofOutput } from './data/get-all-proof.output';
import { GetAllProofService } from './get-all-proof.service';

@Controller('proof')
export class GetAllProofController {

    constructor(
        private readonly getAllProofService: GetAllProofService,
        private readonly getProofFileService: GetProofFileService,
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