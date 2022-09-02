import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { Period } from "src/enum/period.enum";

export class UpPayStubInput {

    @ApiPropertyOptional({
        enum: Period,
        enumName: "Period",
    })
    @IsOptional()
    @IsEnum(Period)
    periodMonth: Period

    @ApiPropertyOptional()
    @IsOptional()
    periodYear: number;

}