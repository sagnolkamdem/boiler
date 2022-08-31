import { User } from "src/entity/person.entity";

export class GetPayStubOutput {
    message: string;
    statusCode: number;
    payStub: User;
}