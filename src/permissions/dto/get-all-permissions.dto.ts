import { Permission } from '../entities/permission.entity';

export class GetAllPermissionsDTO {
  message: string;
  statusCode: number;
  data: Permission[] | Permission;
}
