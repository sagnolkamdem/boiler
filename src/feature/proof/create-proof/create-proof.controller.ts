import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProofService } from './create-proof.service';
import { CreateProofInput } from './data/create-proof.input';
import { CreateProofOutput } from './data/create-proof.output';
import { ConfigService } from '@nestjs/config';

import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('proof')
export class CreateProofController {
  filename: string;

  constructor(private readonly createProofService: CreateProofService) {}

  @ApiTags('proof')
  @ApiBearerAuth()
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProofInput: CreateProofInput,
  ): Promise<CreateProofOutput> {
    createProofInput.file = 'as';

    return this.createProofService.create(createProofInput, file);
  }
}
