import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/entity/person.entity";
import { ScoreStatus } from "src/enum/scoreStatus.enum";

export class CreateScoreInput {
    
    @ApiProperty()
    @IsNotEmpty()
    latitude: number;
    
    @ApiProperty()
    @IsNotEmpty()
    longitude: number;

    @IsOptional()
    createdAtDate: string;

    @IsOptional()
    createdAtTime: string;

    @IsOptional()
    updatedAtDate: string;

    @IsOptional()
    updatedAtTime: string;

    @IsOptional()
    status: ScoreStatus;
    
    @ApiProperty({
        type: () => User
    })
    @IsNotEmpty()
    user: User;

}