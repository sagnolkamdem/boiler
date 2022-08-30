import { Role } from "src/enum/role.enum";
import { Service } from "src/enum/service.enum";
import { Column, Entity, Generated, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { PayStub } from "./payStub.entity";
import { Score } from "./score.entity";

@Entity('person')
export class User extends Base {

    @Column()
    name: string;

    @Column()
    token: string;

    @Column({
        nullable: true
    })
    phoneNumber: string;

    @Column({
        nullable: true
    })
    email: string;

    @Column({
        nullable: true
    })
    cni: string;

    @Column({
        type: 'date',
        nullable: true
    })
    dob: Date;

    @Column({
        nullable: true
    })
    pob: string;

    @Column({
        nullable: true
    })
    salary: number;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.EMPLOYEE
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

}