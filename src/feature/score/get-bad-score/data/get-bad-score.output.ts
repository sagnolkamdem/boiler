import { User } from 'src/entity/person.entity';

export interface GetBadScoreOutput {
  message: string;
  statusCode: number;
  data: User[] | User;
}
