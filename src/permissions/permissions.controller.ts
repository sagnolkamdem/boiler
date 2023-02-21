import { User } from 'src/entity/person.entity';
import { CreateProofService } from './../feature/proof/create-proof/create-proof.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateProofInput } from 'src/feature/proof/create-proof/data/create-proof.input';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('proof', {
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
    @Body() createPermissionDto: CreatePermissionDto,
  ) {
    return this.permissionsService.create(createPermissionDto, file);
  }

  @ApiBearerAuth()
  @ApiParam({
    name: 'userId',
    description: 'Id of user to get all permissions of that user',
    required: false,
  })
  @ApiParam({
    name: 'startDate',
    description: 'The date to start getting permissions from',
    required: false,
  })
  @ApiParam({
    name: 'endDate',
    description:
      'The date to end getting permissions from. that value is required when you enter the start date',
    required: false,
  })
  @Get()
  findAll(@Query() query: any) {
    return this.permissionsService.find(
      query.userId,
      query.startDate,
      query.endDate,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
