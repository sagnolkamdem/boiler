import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  startDate: string;

  @IsOptional()
  id: string;
}
