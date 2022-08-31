import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/entity/person.entity";
import { Period } from "src/enum/period.enum";

export class CreatePayStubInput {

    @IsNotEmpty()
    @IsEnum(Period)
    periodMonth: Period

    @IsOptional()
    periodYear: number;

    @IsNotEmpty()
    user: User

}