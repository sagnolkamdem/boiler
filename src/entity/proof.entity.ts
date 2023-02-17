import { Permission } from './../permissions/entities/permission.entity';
import { ProofStatus } from 'src/enum/proofStatus.enum';
import { RejectedReason } from 'src/enum/rejectedReason.enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { User } from './person.entity';
import { Score } from './score.entity';

@Entity()
export class Proof extends Base {
  @Column()
  message: string;

  @Column({
    nullable: true,
  })
  file: string;

  @Column({
    type: 'enum',
    enum: ProofStatus,
    default: ProofStatus.PENDING,
  })
  status: ProofStatus;

  @Column({
    type: 'enum',
    enum: RejectedReason,
    nullable: true,
  })
  rejectedReason!: RejectedReason;

  @OneToMany(() => Score, (Score) => Score.proof)
  scores: Score[];

  @ManyToOne(() => User, (user) => user.proofsTreatedBy)
  treatBy!: User;

  @ManyToOne(() => User, (user) => user.proofsCreatedBy)
  concerns: User;

  @ManyToOne(() => Permission, (permission) => permission.proofs)
  concernedPermission!: Permission;
}
