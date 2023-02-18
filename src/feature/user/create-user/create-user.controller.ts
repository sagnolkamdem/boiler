import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/feature/auth/auth/jwt-auth.guard';
import { Public } from 'src/feature/auth/auth/public.strategy';
import { CreateUserService } from './create-user.service';
import { UserInput } from './data/user.input';
import { UserOutput } from './data/user.output';

@Controller('user')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

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
  @Post()
  create(@Body() userInput: UserInput): Promise<UserOutput> {
    return this.createUserService.create(userInput);
  }
}
