import { Body, Controller, Post } from '@nestjs/common';
import { CreatePayStubService } from './create-pay-stub.service';
import { CreatePayStubInput } from './data/create-pay-stub.input';
import { CreatePayStubOutput } from './data/create-pay-stub.output';

@Controller('payStub')
export class CreatePayStubController {

    constructor(
        private readonly createPayStubService: CreatePayStubService,
    ) { }

    @Post()
    create(@Body() createPayStubInput: CreatePayStubInput): Promise<CreatePayStubOutput> {
        return this.createPayStubService.create(createPayStubInput);
    }
}
