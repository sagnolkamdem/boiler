import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/feature/auth/auth/jwt-auth.guard';
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
