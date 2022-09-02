import { Body, Controller, Post, Request, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/feature/auth/auth/auth.service';
import { LocalAuthGuard } from 'src/feature/auth/auth/local-auth.guard';
import { Public } from 'src/feature/auth/auth/public.strategy';
import { LoginUserInput } from './data/login-user.input';
import { LoginUserOutput } from './data/login-user.output';
import { LoginUserService } from './login-user.service';

@Controller('login')
export class LoginUserController {

    constructor(
        private readonly loginUserService: LoginUserService,
        private readonly authService: AuthService,
    ) { }

    // @Post()
    // login(@Req() request: Request, @Body() loginUserInput: LoginUserInput): Promise<LoginUserOutput> {
    //     return this.loginUserService.login(loginUserInput);
    // }

    @ApiTags('user')
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('auth')
    async logine(@Request() request) {
        return this.authService.login(request.user)
    }
}
