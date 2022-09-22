import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/entity/person.entity";
import { Score } from "src/entity/score.entity";

export class CreateProofInput {

    @ApiProperty()
    @IsNotEmpty()
    message: string;

    @ApiPropertyOptional()
    @IsOptional()
    file: string;

    @ApiProperty({
        type: () => User
    })
    @IsNotEmpty()
    concerns: User;

    // @IsNotEmpty()
    // @IsArray()
    // scores: Score[];

}