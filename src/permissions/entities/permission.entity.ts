import { Score } from 'src/entity/score.entity';
import { JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/entity/person.entity';
import { Proof } from 'src/entity/proof.entity';
import { PermissionStatus } from 'src/enum/permissionStatus.enum';
import { PermissionType } from 'src/enum/permissionType.enum';
import { Column, Entity, OneToOne } from 'typeorm';
import { Base } from 'src/entity/base.entity';

@Entity('permissions')
export class Permission extends Base {
  @Column({
    nullable: false,
  })
  user_id: string;

  @Column({
    nullable: true,
  })
  proof_id: string;

  @Column({
    nullable: true,
  })
  updated_by: string;

  @Column({
    default: 'motif',
  })
  motif: string;

  @Column({
    type: 'enum',
    enum: PermissionStatus,
    default: PermissionStatus.NEW,
  })
  status: PermissionStatus;

  @Column({
    type: 'enum',
    default: PermissionType.ABSENCE,
    enum: PermissionType,
  })
  type: PermissionType;

  @Column()
  duration: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
    type: 'time',
  })
  out_time: string;

  @Column({
    nullable: true,
    type: 'time',
  })
  in_time: string;

  @Column({
    nullable: true,
    type: 'date',
  })
  start_date: Date;

  @Column({
    nullable: true,
    type: 'date',
  })
  end_date: Date;

  @ManyToOne(() => User, (User) => User.permissions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, (User) => User.permissionsUpdated)
  @JoinColumn({ name: 'updated_by' })
  validated_by: User;

  @OneToOne(() => Proof, (proof) => proof.concernedPermission)
  @JoinColumn({ name: 'proof_id' })
  proofs: Proof;

  @OneToOne(() => Score, (score) => score.id)
  @JoinColumn({ name: 'out_time' })
  scan_out: Score;

  @OneToOne(() => Score, (score) => score.id)
  @JoinColumn({ name: 'in_time' })
  scan_in: Score;
}
