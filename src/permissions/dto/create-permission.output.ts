import { Permission } from '../entities/permission.entity';

export class CreatePermissionOutput {
  message: string;
  statusCode: number;
  permission: Permission;
}
