import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Repository } from 'typeorm';
import { UserUpdateInput } from './data/userUpdate.input';
import { UserUpdateOutput } from './data/userupdate.output';

@Injectable()
export class UpdateUserService {
    
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async update(id: string, userUpdateInput: UserUpdateInput): Promise<UserUpdateOutput> {
        try {
            
            const user = await this.userRepository.update(id, userUpdateInput);
            return {
                message: "User updated successfully",
                statusCode: 201,
                data: await this.userRepository.findOneBy({id})
            };
        } catch (error) {
            console.log(error);
            
            return {
                message: "An error occurred while creating user",
                statusCode: 500,
                data: null,
            };
        }
    }
}
