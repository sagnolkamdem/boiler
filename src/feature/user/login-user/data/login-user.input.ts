import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginUserInput {

    @ApiProperty()
    @IsNotEmpty()
    token: string;
}