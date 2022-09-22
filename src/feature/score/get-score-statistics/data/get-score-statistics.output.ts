import { Statistics } from "../interface/statistics.interface";

export class GetScoreStatisticsOutput {
    message: string;
    statusCode: number;
    statistic: Statistics;
}