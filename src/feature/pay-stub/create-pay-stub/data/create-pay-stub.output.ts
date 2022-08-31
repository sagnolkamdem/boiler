import { PayStub } from "src/entity/payStub.entity";

export class CreatePayStubOutput {
    message: string;
    statusCode: number;
    payStub: PayStub
}