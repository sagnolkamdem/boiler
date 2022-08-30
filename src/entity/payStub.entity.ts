import { Period } from "src/enum/period.enum";
import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./base.entity";
import { User } from "./person.entity";

@Entity()
export class PayStub extends Base {

    @Column()
    job: String;

    @Column({
        type: "enum",
        enum: Period
    })
    periodMonth: Period

    @Column()
    periodYear: string;

    @ManyToOne(() => User, (user) => user.payStubs)
    user: User;
}