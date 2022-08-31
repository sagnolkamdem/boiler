import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayStub } from 'src/entity/payStub.entity';
import { User } from 'src/entity/person.entity';
import { Period } from 'src/enum/period.enum';
import { Like, Repository } from 'typeorm';
import { GetPayStubOutput } from './data/get-pay-stub.output';

@Injectable()
export class GetPayStubService {

    constructor(
        @InjectRepository(PayStub) private readonly payStubRepository: Repository<PayStub>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async findOne(userId: string, month: Period, year: string): Promise<GetPayStubOutput> {

        const now = new Date();
        
        try {

            const user = await this.userRepository.findOne({
                where: {
                    id: userId,
                }
            });

            if (!user) {
                return {
                    message: 'User not found',
                    statusCode: 404,
                    payStub: null
                }
            }

            if (!month) {
                const payStub = await this.userRepository.findOne({
                    where: {
                        id: userId,
                        payStubs: {
                            periodYear: parseInt(year) || now.getFullYear(),
                        }
                    },
                    relations: {
                        payStubs: true,
                    },
                });
                
                return {
                    message: `Pay stub of ${year} successfully retrieved`,
                    statusCode: 200,
                    payStub: payStub
                }
            }

            const payStub = await this.userRepository.findOne({
                where: {
                    id: userId,
                    payStubs: {
                        periodMonth: month,
                        periodYear: parseInt(year) || now.getFullYear(),
                    }
                },
                relations: {
                    payStubs: true,
                },
            });
            
            return {
                message: `Pay stub of ${month}-${year} successfully retrieved`,
                statusCode: 200,
                payStub: payStub
            }

            
        } catch (error) {
            return {
                message: "An error occurred, please check if month and user are correct",
                statusCode: 404,
                payStub: null
            }
        }

    }
}
