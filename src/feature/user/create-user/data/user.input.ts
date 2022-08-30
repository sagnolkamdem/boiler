import { IsNotEmpty, IsOptional } from "class-validator";
import { Role } from "src/enum/role.enum";
import { Service } from "src/enum/service.enum";

export class UserInput {

    @IsNotEmpty()
    name: string;

    @IsOptional()
    token: string;

    @IsNotEmpty()
    service: Service;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    cni: string;

    @IsNotEmpty()
    dob: Date;

    @IsNotEmpty()
    pob: string;

    @IsNotEmpty()
    salary: number;

    @IsOptional()
    role: Role;
}