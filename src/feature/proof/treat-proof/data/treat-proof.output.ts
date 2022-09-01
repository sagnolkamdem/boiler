import { Proof } from "src/entity/proof.entity";

export class TreatProofOutput {
    message: string;
    statusCode: number;
    proof: Proof;
}