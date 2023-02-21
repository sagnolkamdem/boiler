import { User } from 'src/entity/person.entity';
import { Permission } from '../entities/permission.entity';

export class GetAllPermissionsDTO {
  message: string;
  statusCode: number;
  data: User | User[] | Permission[] | Permission;
}
