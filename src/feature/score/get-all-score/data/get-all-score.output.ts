import { User } from "src/entity/person.entity";
import { Score } from "src/entity/score.entity";

export class GetAllScoreOutput {
    message: string;
    statusCode: number;
    data: User[] | Score[] | Score;
}