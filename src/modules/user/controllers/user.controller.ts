/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/modules/auth/guards/local-auth.guard';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { Public } from 'src/modules/auth/strategies/public.strategy';
import { UserInput } from '../data/user.input';
import { UserOutput } from '../data/user.output';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    /**
     * Register a user
     * @param userInput 
     * @returns statusCode and message
    */
    @ApiTags('user')
    @ApiBearerAuth()
    @ApiParam({
        name: 'username',
        type: 'string',
        required: false,
    })
    @ApiResponse({
        status: 201,
        description: 'User created successfully!',
    })
    @ApiResponse({
        status: 500,
        description: 'An error occurred while creating user!',
    })
    @Public()
    @Post('register')
    create(@Body() userInput: UserInput): Promise<UserOutput> {
        return this.userService.create(userInput);
    }

    /**
     * Login a user
     * @param request 
     * @returns statusCode and message
    */
    @ApiTags('user')
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async logine(@Request() request) {
        return this.authService.login(request.user);
    }
}
