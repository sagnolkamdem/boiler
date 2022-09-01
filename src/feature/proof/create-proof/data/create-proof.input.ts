import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/entity/person.entity";

export class CreateProofInput {

    @IsNotEmpty()
    message: string;

    @IsOptional()
    file: string;

    @IsNotEmpty()
    concerns: User;

}