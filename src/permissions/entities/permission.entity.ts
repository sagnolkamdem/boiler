import { OneToMany } from 'typeorm';
import { User } from 'src/entity/person.entity';
import { Proof } from 'src/entity/proof.entity';
import { PermissionStatus } from 'src/enum/permissionStatus.enum';
import { PermissionType } from 'src/enum/permissionType.enum';
import { Column, Entity, OneToOne } from 'typeorm';
import { Base } from 'src/entity/base.entity';

@Entity('permissions')
export class Permission extends Base {
  @Column()
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
  service: PermissionStatus;

  @Column({
    type: 'enum',
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
    type: 'date',
  })
  scan_out: Date;

  @Column({
    nullable: true,
    type: 'date',
  })
  scan_in: Date;

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

  @OneToOne(() => User, (User) => User.permissions)
  user: User;

  @OneToOne(() => User, (User) => User.permissionsUpdated)
  validated_by: User;

  @OneToMany(() => Proof, (proof) => proof.concernedPermission)
  proofs!: Proof[];
}
