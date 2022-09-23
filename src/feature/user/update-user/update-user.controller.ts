import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserUpdateInput } from './data/userUpdate.input';
import { UserUpdateOutput } from './data/userupdate.output';
import { UpdateUserService } from './update-user.service';

@Controller('user')
export class UpdateUserController {

    constructor(
        private updateUserService: UpdateUserService,
    ) { }

    @ApiTags('user')
    @ApiBearerAuth()
    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdateInput: UserUpdateInput): Promise<UserUpdateOutput> {
        return this.updateUserService.update(id, userUpdateInput);
    }
}
