import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { UserInput } from './data/user.input';
import { UserOutput } from './data/user.output';

@Controller('user')
export class CreateUserController {

    constructor(
        private readonly createUserService: CreateUserService,
    ) { }

    @Post()
    create(@Body() userInput: UserInput): Promise<UserOutput> {
        return this.createUserService.create(userInput);
    }
}
