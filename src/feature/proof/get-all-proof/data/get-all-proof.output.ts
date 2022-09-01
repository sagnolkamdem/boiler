import { User } from "src/entity/person.entity";
import { Proof } from "src/entity/proof.entity";

export class GetAllProofOutput {
    message: string;
    statusCode: number;
    data: Proof | Proof[] | User | User[];
}