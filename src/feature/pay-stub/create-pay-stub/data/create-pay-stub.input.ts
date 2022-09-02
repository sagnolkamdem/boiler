import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/entity/person.entity";
import { Period } from "src/enum/period.enum";

export class CreatePayStubInput {

    @ApiProperty({
        enum: Period,
        enumName: "Period",
    })
    @IsNotEmpty()
    @IsEnum(Period)
    periodMonth: Period

    @ApiProperty({
        type: Number,
        description: "The year of the pay stub"
    })
    @IsOptional()
    periodYear: number;

    @ApiProperty({
        type: () => User,
    })
    @IsNotEmpty()
    user: User

}