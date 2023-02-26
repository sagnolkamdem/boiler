import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, Length, Min } from "class-validator";
import { Role } from "src/core/model/enum/role.enum";

export class UserInput {

    @ApiProperty()
    @IsNotEmpty()
    @Length(3, 100)
    name: string;

    @ApiProperty()
    @IsOptional()
    username: string;

    @ApiProperty()
    @IsOptional()
    @Length(8, 12)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsOptional()
    dob: Date;

    @ApiProperty()
    @IsOptional()
    pob: string;

    @ApiPropertyOptional({
        name: 'role',
        enum: Role,
        default: Role.USER,
    })
    @IsOptional()
    role: Role;
}