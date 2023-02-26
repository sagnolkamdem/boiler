import { User } from "src/core/model/entity/person.entity";

export class UserUpdateOutput {
    message: string;
    statusCode: number;
    data: User;
}