import { PayStub } from "src/entity/payStub.entity";

export class UpPayStubOutput {
    message: string;
    statusCode: number;
    payStub: PayStub;
}