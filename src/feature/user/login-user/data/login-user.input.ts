import { IsNotEmpty } from "class-validator";

export class LoginUserInput {

    @IsNotEmpty()
    token: string;
}