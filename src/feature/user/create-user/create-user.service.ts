import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInput } from './data/user.input';
import { UserOutput } from './data/user.output';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/person.entity';

@Injectable()
export class CreateUserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async create(userInput: UserInput): Promise<UserOutput> {
        try {
            userInput.token = await bcrypt.hash(userInput.name, 12);
            const user = await this.userRepository.save(userInput);
            return {
                message: "User created successfully",
                statusCode: 201,
                token: user.token,
            };
        } catch (error) {
            return {
                message: "An error occurred while creating user",
                statusCode: 500,
                token: null,
            };
        }
    }

    async findOneByToken(token: string): Promise<any> {
        try {

            const user = await this.userRepository.findOne({
                where: {
                    token,
                }
            });

            return user ? user.id : null;

        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
