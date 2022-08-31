import { Injectable } from '@nestjs/common';
import { LoginUserService } from 'src/feature/user/login-user/login-user.service';

@Injectable()
export class AuthService {

    constructor(
        private loginUserService: LoginUserService,
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
}
