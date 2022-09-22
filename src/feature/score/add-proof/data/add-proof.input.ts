import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";
import { Score } from "src/entity/score.entity";

export class AddProofInput {

    @ApiProperty({
        type: [String]
    })
    @IsNotEmpty()
    @IsArray()
    score: string[];
    
}