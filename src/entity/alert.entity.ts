import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./base.entity";
import { User } from "./person.entity";

@Entity('alert')
export class Alert extends Base{
    @Column()
    latitude: number;

    @Column()
    longitude: number;


    @ManyToOne(() => User, (user) => user.alerts)
    user: User; 
}