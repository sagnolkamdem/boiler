import { ProofStatus } from "src/enum/proofStatus.enum";
import { RejectedReason } from "src/enum/rejectedReason.enum";
import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { Score } from "./score.entity";

@Entity()
export class Proof extends Base {

    @Column()
    message: string;

    @Column()
    file: string;

    @Column({
        type: "enum",
        enum: ProofStatus
    })
    status: ProofStatus

    @Column()
    treatBy: string;

    @Column({
        type: "enum",
        enum: RejectedReason
    })
    rejectedReason: string;

    @OneToMany(() => Score, (Score) => Score.proof)
    scores: Score[];
}