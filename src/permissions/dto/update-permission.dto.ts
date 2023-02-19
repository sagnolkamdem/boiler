import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PermissionStatus } from 'src/enum/permissionStatus.enum';
import { PermissionType } from 'src/enum/permissionType.enum';

export class UpdatePermissionDto {
  @ApiProperty()
  @IsOptional()
  proof_id: string;

  @IsNotEmpty()
  motif: string;

  @IsOptional()
  status: PermissionStatus;

  @IsOptional()
  type: PermissionType;

  @IsNotEmpty()
  duration: string;

  @IsOptional()
  description: string;

  @IsOptional()
  out_time: string;

  @IsOptional()
  in_time: string;

  @IsOptional()
  start_date: string;

  @IsOptional()
  end_date: string;

  @IsOptional()
  updated_by: string;
}
