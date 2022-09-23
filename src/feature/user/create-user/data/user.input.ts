import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { Role } from "src/enum/role.enum";
import { Service } from "src/enum/service.enum";

export class UserInput {

    @ApiProperty()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsOptional()
    token: string;

    @ApiProperty({
        name: "service",
        enum: Service,
    })
    @IsNotEmpty()
    service: Service;

    @ApiProperty()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
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

    @ApiPropertyOptional({
        name: 'role',
        enum: Role,
        default: Role.EMPLOYEE,
    })
    @IsOptional()
    role: Role;
}