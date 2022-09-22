import { Injectable } from '@nestjs/common';
import { LoginUserService } from 'src/feature/user/login-user/login-user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/person.entity';

@Injectable()
export class AuthService {

    constructor(
        private loginUserService: LoginUserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.loginUserService.validateUser(username, password);

        if (!user) {
            return null;
        } else {
            const { salary, ...result} = user;
            return result;
        }
    }

    async login(user: User) {
        const payload = { username: user.name, sub: user.id };
        const { token, ...result } = user;
        return {
          access_token: this.jwtService.sign(payload),
          user: result
        };
      }
}
