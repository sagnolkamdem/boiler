import { Injectable, Render } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RenderPayStubService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    
    async renderHtml(userId: string) {
        const date = new Date();
        const now = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const user = await this.userRepository.findOneBy({id: userId});
        
        return {
            user: user,
            now: now
        }
    }
}
