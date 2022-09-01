import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayStub } from 'src/entity/payStub.entity';
import { User } from 'src/entity/person.entity';
import { CreatePayStubController } from './create-pay-stub/create-pay-stub.controller';
import { CreatePayStubService } from './create-pay-stub/create-pay-stub.service';
import { GetPayStubController } from './get-pay-stub/get-pay-stub.controller';
import { GetPayStubService } from './get-pay-stub/get-pay-stub.service';
import { UpPayStubController } from './up-pay-stub/up-pay-stub.controller';
import { UpPayStubService } from './up-pay-stub/up-pay-stub.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PayStub, User]),
  ],
  controllers: [CreatePayStubController, GetPayStubController, UpPayStubController],
  providers: [CreatePayStubService, GetPayStubService, UpPayStubService]
})
export class PayStubModule {}