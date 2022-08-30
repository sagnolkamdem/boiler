import { User } from "src/entity/person.entity";

export class GetAllScoreOutput {
    message: string;
    statusCode: number;
    data: User[];
}