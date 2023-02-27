/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from 'src/core/model/entity/person.entity';
import { UserInput } from '../data/user.input';
import { UserOutput } from '../data/user.output';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async create(userInput: UserInput): Promise<UserOutput> {
        try {
            userInput.password = await bcrypt.hash(userInput.password, 12);
            await this.userRepository.save(userInput);
            return {
                message: "User created successfully",
                statusCode: 201,
            };
        } catch (error) {
            console.log(error);
            
            return {
                message: "An error occurred while creating user",
                statusCode: 500,
            };
        }
    }

    async getUsers(): Promise<User[]> {
        try {
            const users = await this.userRepository.find();
            return users;
        } catch (error) {
            console.log(error);
        }
    }



    async validateUser(username: string, password: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    email: username,
                },
            })

            if (user && await bcrypt.compare(password, user.password)) {
                return user;
            } else {
                return null;
            }
            
        } catch (err) {
            // catch the error
        }

    }
}
