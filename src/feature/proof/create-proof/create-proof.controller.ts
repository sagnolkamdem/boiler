import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProofService } from './create-proof.service';
import { CreateProofInput } from './data/create-proof.input';
import { CreateProofOutput } from './data/create-proof.output';

import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('proof')
export class CreateProofController {

    constructor(
        private readonly createProofService: CreateProofService,
    ) { }
    // : Promise<CreateProofOutput>

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    create(@UploadedFile() file: Express.Multer.File, @Body() createProofInput: CreateProofInput) {
        return this.createProofService.create(createProofInput, file);
    }

    @Post('ff')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './upload',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
                callback(null, filename);
            }
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(__dirname);
        console.log(file);
    }
}