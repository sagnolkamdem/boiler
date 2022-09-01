import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { AuthService } from '../auth/auth/auth.service';
import { CreateUserController } from './create-user/create-user.controller';
import { CreateUserService } from './create-user/create-user.service';
import { LoginUserController } from './login-user/login-user.controller';
import { LoginUserService } from './login-user/login-user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '365d' },
          }),
    ],
    controllers: [CreateUserController, LoginUserController],
    providers: [CreateUserService, LoginUserService, AuthService]
})
export class UserModule {}
