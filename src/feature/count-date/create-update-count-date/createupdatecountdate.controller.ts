import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUpdateCountDateService } from './createupdatecountdate.service';
import { CreateUpdateDto } from './dto/create-update.dto';

@Controller('createDate')
export class CreateUpdateCountDateController {

    constructor(
        private readonly sreateUpdateCountDateService: CreateUpdateCountDateService,
    ) { }

    @ApiTags('Date')
    @ApiBearerAuth()
    @Post()
    async createUpdateDate(@Body() createUpdateDto: CreateUpdateDto) {
        createUpdateDto.id = '3ea33c4a-27a3-48b4-b5aa-e5fe0f6eefe8';
        return this.sreateUpdateCountDateService.createUpdateCountDate(createUpdateDto);
    }
}
