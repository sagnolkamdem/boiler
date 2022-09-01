import { IsArray, IsNotEmpty } from "class-validator";
import { Score } from "src/entity/score.entity";

export class AddProofInput {

    @IsNotEmpty()
    @IsArray()
    score: string[];
    
}