import { IsEnum, IsOptional } from "class-validator";
import { Period } from "src/enum/period.enum";

export class UpPayStubInput {

    @IsOptional()
    @IsEnum(Period)
    periodMonth: Period

    @IsOptional()
    periodYear: number;

}