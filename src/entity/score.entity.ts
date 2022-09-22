import { ScoreStatus } from "src/enum/scoreStatus.enum";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./person.entity";
import { Proof } from "./proof.entity";

@Entity()
export class Score extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAtOfServer: Date;

    @Column({
        type: 'date',
        nullable: true,
    })
    createdAtDate: string;

    @Column({
        type: 'time',
        nullable: true,
    })
    createdAtTime: string;

    @Column({
        type: 'date',
        nullable: true,
    })
    updatedAtDate: string;

    @Column({
        type: 'time',
        nullable: true,
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