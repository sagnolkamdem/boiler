import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UserUpdateInput {

    @ApiProperty()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsOptional()
    username: string;

    @ApiProperty()
    @IsOptional()
    phoneNumber: string;

    @ApiProperty()
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsOptional()
    dob: Date;

    @ApiProperty()
    @IsOptional()
    pob: string;
}