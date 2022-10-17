import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity()
export class CountDate extends Base {
    @Column({
        type: 'date',
        nullable: true,
    })
    startDate: string;
}