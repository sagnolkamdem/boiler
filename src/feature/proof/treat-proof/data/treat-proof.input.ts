import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/entity/person.entity";
import { ProofStatus } from "src/enum/proofStatus.enum";
import { RejectedReason } from "src/enum/rejectedReason.enum";

export class TreatProofInput {
    
    @IsNotEmpty()
    @IsEnum(ProofStatus)
    status: ProofStatus;

    @IsOptional()
    @IsEnum(RejectedReason)
    rejectedReason: RejectedReason;

    @IsNotEmpty()
    treatBy: User;
}