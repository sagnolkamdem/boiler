import { ScoreStatus } from "src/enum/scoreStatus.enum";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./person.entity";
import { Proof } from "./proof.entity";

@Entity()
export class Score extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'date',
    })
    createdAtDate: string;

    @Column({
        type: 'time',
    })
    createdAtTime: string;

    @Column({
        type: 'date',
    })
    updatedAtDate: string;

    @Column({
        type: 'time',
    })
    updatedAtTime: string;

    @Column({
        type: "enum",
        enum: ScoreStatus
    })
    status: ScoreStatus;

    @ManyToOne(() => User, (user) => user.scores)
    user: User;

    @ManyToOne(() => Proof, (proof) => proof.scores)
    proof!: Proof;
}