import { IsNotEmpty } from "class-validator";
import { User } from "src/entity/person.entity";

export class CreateAlertDto {
    @IsNotEmpty()
    latitude: number;

    @IsNotEmpty()
    longitude: number;


    @IsNotEmpty()
    user: User;
}
