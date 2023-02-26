import { Role } from 'src/core/model/enum/role.enum';
import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity('person')
export class User extends Base {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    unique: true,
  })
  email: string;

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
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;
}
