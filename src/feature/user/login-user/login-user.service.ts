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

    async login(loginUserInput: LoginUserInput): Promise<LoginUserOutput> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    token: loginUserInput.token,
                },
            })
    
            if (!user) {
                return {
                    message: "User not found",
                    statusCode: 404,
                    user: null,
                }
            } else {
                const { salary, ...person} = user;
                return {
                    message: "Successfully logged in",
                    statusCode: 200,
                    user: person,
                }
            }
        } catch (error) {
            return {
                message: "An error occurred while logging in",
                statusCode: 500,
                user: null,
            }
        }
    }

    async validateUser(username: string, password: string): Promise<any> {
        
        try {
            const user = await this.userRepository.findOne({
                where: {
                    username: username,
                    password: password
                    // token: token,
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
