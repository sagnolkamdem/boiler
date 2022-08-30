import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/entity/person.entity";
import { Score } from "src/entity/score.entity";
import { ProofStatus } from "src/enum/proofStatus.enum";

export class CreateProofInput {

    @IsNotEmpty()
    message: string;

    @IsOptional()
    file: string;

    @IsNotEmpty()
    scores: Score[];
}