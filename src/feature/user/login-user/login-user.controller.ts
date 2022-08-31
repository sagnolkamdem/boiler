import { Body, Controller, Post, Request, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserInput } from './data/login-user.input';
import { LoginUserOutput } from './data/login-user.output';
import { LoginUserService } from './login-user.service';

@Controller('login')
export class LoginUserController {

    constructor(
        private readonly loginUserService: LoginUserService
    ) { }

    @Post()
    login(@Req() request: Request, @Body() loginUserInput: LoginUserInput): Promise<LoginUserOutput> {
        return this.loginUserService.login(loginUserInput);
    }

    @UseGuards(AuthGuard('local'))
    @Post('auth')
    async logine(@Request() request) {
        return request.user;
    }
}
