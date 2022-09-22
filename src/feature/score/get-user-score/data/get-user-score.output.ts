import { User } from "src/entity/person.entity";

export class GetUserScoreOutput {
    message: string;
    statusCode: number;
    user: User;
}