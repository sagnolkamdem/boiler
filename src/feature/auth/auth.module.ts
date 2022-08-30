import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { CreateUserService } from '../user/create-user/create-user.service';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
  ],
  providers: [AuthService, CreateUserService, LocalStrategy]
})
export class AuthModule {}
