import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountDate } from 'src/entity/startDate.entity';
import { Repository } from 'typeorm';
import { CreateUpdateDto } from './dto/create-update.dto';

@Injectable()
export class CreateUpdateCountDateService {

    constructor(
        @InjectRepository(CountDate) private readonly dateRepository: Repository<CountDate>,
    ) { }

    async createUpdateCountDate(createUpdateDto: CreateUpdateDto) {
        try {
            await this.dateRepository.save(createUpdateDto);
            
            return {
                message: "Save successfully!",
                statusCode: 200,
            }
        } catch (error) {

            return {
                message: "An error occured while updating entity!",
                statusCode: 500,
            }
        }
    }
}
