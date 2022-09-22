import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayStub } from 'src/entity/payStub.entity';
import { Period } from 'src/enum/period.enum';
import { Repository } from 'typeorm';
import { UpPayStubInput } from './data/up-pay-stub.input';
import { UpPayStubOutput } from './data/up-pay-stub.output';

@Injectable()
export class UpPayStubService {

    constructor(
        @InjectRepository(PayStub) private readonly payStubRepository: Repository<PayStub>,
    ) { }

    async update(id: string, upPayStubInput: UpPayStubInput): Promise<UpPayStubOutput> {
        
        try {
            
            const upPayStub = await this.payStubRepository.findOneBy({id});

            const existingPayStub = await this.payStubRepository.findOne({
                where: {
                    periodMonth: upPayStubInput.periodMonth as Period,
                    periodYear: upPayStubInput.periodYear
                }
            });

            if (!upPayStub || existingPayStub) {
                let message: string;
                !upPayStub ? message = "Pay stub not found" : message = "A pay stub already corresponds to the data entered in the form";
                return {
                    message,
                    statusCode: 404,
                    payStub: null
                }
            }

            await this.payStubRepository.update(id, upPayStubInput)

            return {
                message: "Pay stub updated successfully",
                statusCode: 200,
                payStub: await this.payStubRepository.findOne({
                    where: {
                        id: upPayStub.id,
                    },
                    relations: {
                        user: true,
                    }
                })
            }

        } catch (error) {
            return {
                message: 'An error occurred, please check your pay stub',
                statusCode: 500,
                payStub: null
            }
        }

    }
}
