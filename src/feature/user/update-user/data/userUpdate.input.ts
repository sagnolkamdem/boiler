import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { Role } from "src/enum/role.enum";
import { Service } from "src/enum/service.enum";

export class UserUpdateInput {

    @ApiProperty()
    @IsOptional()
    name: string;

    @ApiProperty({
        name: "service",
        enum: Service,
    })
    @IsOptional()
    service: Service;

    @ApiProperty()
    @IsOptional()
    phoneNumber: string;

    @ApiProperty()
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsOptional()
    cni: string;

    @ApiProperty()
    @IsOptional()
    dob: Date;

    @ApiProperty()
    @IsOptional()
    pob: string;

    @ApiProperty({
        type: Number,
    })
    @IsOptional()
    salary: number;
}