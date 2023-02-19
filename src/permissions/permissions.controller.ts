import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }
  @ApiBearerAuth()
  @ApiParam({
    name: 'userId',
    description: 'Id of user to get all scores of that user',
    required: false,
  })
  @ApiParam({
    name: 'startDate',
    description: 'The date to start getting scores from',
    required: false,
  })
  @ApiParam({
    name: 'endDate',
    description:
      'The date to end getting scores from. that value is required when you enter the start date',
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
    return this.permissionsService.findOne(+id);
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
