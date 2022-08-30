import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { CreateUserController } from './create-user/create-user.controller';
import { CreateUserService } from './create-user/create-user.service';
import { LoginUserController } from './login-user/login-user.controller';
import { LoginUserService } from './login-user/login-user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [CreateUserController, LoginUserController],
    providers: [CreateUserService, LoginUserService]
})
export class UserModule {}
