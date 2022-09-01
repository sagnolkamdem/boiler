import { IsArray, IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/entity/person.entity";
import { Score } from "src/entity/score.entity";

export class CreateProofInput {

    @IsNotEmpty()
    message: string;

    @IsOptional()
    file: string;

    @IsNotEmpty()
    concerns: User;

    // @IsNotEmpty()
    // @IsArray()
    // scores: Score[];

}