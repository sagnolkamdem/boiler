import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/entity/person.entity";
import { ProofStatus } from "src/enum/proofStatus.enum";
import { RejectedReason } from "src/enum/rejectedReason.enum";

export class TreatProofInput {
    
    @ApiProperty({
        enum: ProofStatus,
        enumName: "ProofStatus",
    })
    @IsNotEmpty()
    @IsEnum(ProofStatus)
    status: ProofStatus;

    @ApiPropertyOptional({
        enum: RejectedReason,
        enumName: "RejectedReason",
    })
    @IsOptional()
    @IsEnum(RejectedReason)
    rejectedReason: RejectedReason;

    @ApiProperty({
        type: () => User,
    })
    @IsNotEmpty()
    treatBy: User;
}