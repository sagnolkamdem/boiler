import { Injectable } from '@nestjs/common';
import { CreateUserService } from 'src/feature/user/create-user/create-user.service';

@Injectable()
export class AuthService {

    constructor(
        private createUserService: CreateUserService,
    ) { }

    async validateUser(token: string): Promise<any> {
        const user = await this.createUserService.findOneByToken(token);

        if (!user) {
            return null;
        } else {
            const { salary, ...result} = user;
            return result;
        }
    }
}
