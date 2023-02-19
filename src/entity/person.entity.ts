import { Permission } from './../permissions/entities/permission.entity';
import { Role } from 'src/enum/role.enum';
import { Service } from 'src/enum/service.enum';
import { Column, Entity, Generated, OneToMany, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { PayStub } from './payStub.entity';
import { Proof } from './proof.entity';
import { Score } from './score.entity';

@Entity('person')
export class User extends Base {
  @Column()
  name: string;

  @Column({
    default: 'username',
  })
  username: string;

  @Column({
    default: 'password',
  })
  password: string;

  @Column({
    default: 'qw',
  })
  job: string;

  @Column()
  token: string;

  @Column({
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  cni: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  dob: Date;

  @Column({
    nullable: true,
  })
  pob: string;

  @Column({
    nullable: true,
  })
  salary: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.EMPLOYEE,
  })
  role: Role;

  @Column({
    type: 'enum',
    enum: Service,
  })
  service: Service;

  @OneToMany(() => Score, (Score) => Score.user)
  scores: Score[];

  @OneToMany(() => PayStub, (PayStub) => PayStub.user)
  payStubs: PayStub[];

  @OneToMany(() => Proof, (proof) => proof.treatBy)
  proofsTreatedBy!: Proof[];

  @OneToMany(() => Proof, (proof) => proof.concerns)
  proofsCreatedBy!: Proof[];

  @OneToMany(() => Permission, (permissions) => permissions.user)
  permissions: Permission[];

  @OneToMany(() => Permission, (permissions) => permissions.validated_by)
  permissionsUpdated: Permission[];
}
