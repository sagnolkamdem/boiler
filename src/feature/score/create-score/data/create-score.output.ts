import { Score } from "src/entity/score.entity";

export class CreateScoreOutput {
    message: string;
    statusCode: number;
    score: Score;
}