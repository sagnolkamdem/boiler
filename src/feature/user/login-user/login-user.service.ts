import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Repository } from 'typeorm';
import { LoginUserInput } from './data/login-user.input';
import { LoginUserOutput } from './data/login-user.output';

@Injectable()
export class LoginUserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        
        try {
            const user = await this.userRepository.findOne({
                where: {
                    token: username,
                },
            })
            if (!user) {
                return null;
            } else {
                return user;
            }
        } catch (err) {
            // catch the error
        }

    }
}
