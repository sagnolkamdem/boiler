import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/entity/person.entity";
import { Proof } from "src/entity/proof.entity";
import { ScoreStatus } from "src/enum/scoreStatus.enum";

export class CreateScoreInput {

    @IsNotEmpty()
    latitude: number;

    @IsNotEmpty()
    longitude: number;

    @IsOptional()
    createdAtDate: string;

    @IsOptional()
    createdAtTime: string;

    @IsOptional()
    updatedAtDate: string;

    @IsOptional()
    updatedAtTime: string;

    @IsOptional()
    status: ScoreStatus;

    @IsNotEmpty()
    user: User;

}