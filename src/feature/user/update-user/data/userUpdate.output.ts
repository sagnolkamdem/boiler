import { User } from "src/entity/person.entity";

export class UserUpdateOutput {
    message: string;
    statusCode: number;
    data: User;
}