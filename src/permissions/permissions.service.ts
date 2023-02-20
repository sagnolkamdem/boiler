import { GetAllPermissionsDTO } from './dto/get-all-permissions.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Score } from 'src/entity/score.entity';
import { Between, Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: createPermissionDto.user_id.toString(),
        },
      });
      if (user) {
        const permission = await this.permissionRepository.save(
          createPermissionDto,
        );

        return {
          message: 'Permission saved successfully',
          statusCode: 201,
          permission: permission,
        };
      } else {
        return {
          message: 'User not found',
          statusCode: 404,
          score: null,
        };
      }
    } catch (error) {
      console.log(error);

      return {
        message: 'An error occurred',
        statusCode: 500,
        score: null,
      };
    }
  }

  findAll() {
    return `This action returns all permissions`;
  }

  async findOne(id: string): Promise<GetAllPermissionsDTO> {
    const permission = await this.permissionRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
        validated_by: true,
        proofs: true,
        scan_out: true,
        scan_in: true,
      },
    });

    if (permission) {
      return {
        message: 'Permission got successfully',
        statusCode: 201,
        data: permission,
      };
    } else {
      return {
        message: 'Permission not found',
        statusCode: 404,
        data: null,
      };
    }
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<GetAllPermissionsDTO> {
    const permission = await this.permissionRepository.findOne({
      where: {
        id: id,
      },
    });

    if (permission) {
      await this.permissionRepository.update(id, updatePermissionDto);
      const perm = await this.permissionRepository.findOne({
        where: {
          id: id,
        },
      });
      return {
        message: 'Permission updated successfully',
        statusCode: 201,
        data: perm,
      };
    } else {
      return {
        message: 'Permission not found',
        statusCode: 404,
        data: null,
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }

  async find(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<GetAllPermissionsDTO> {
    try {
      if (startDate && !userId) {
        if (!endDate) {
          return {
            message: 'Please select an end date',
            statusCode: 404,
            data: null,
          };
        }

        const permission = await this.permissionRepository.find({
          where: {
            // Check if the current user is an administrator
            // role: Role.ADMIN,
            createdAt: Between(startDate, endDate),
          },
          relations: {
            user: true,
            validated_by: true,
            proofs: true,
            scan_out: true,
            scan_in: true,
          },
        });

        return {
          message: 'Data successfully retrieved',
          statusCode: 200,
          data: permission,
        };
      }

      if (userId) {
        if (startDate) {
          if (!endDate) {
            return {
              message: 'Please select an end date',
              statusCode: 404,
              data: null,
            };
          }

          const permission = await this.permissionRepository.find({
            where: {
              user: {
                id: userId,
              },
            },
            relations: {
              user: true,
              validated_by: true,
              proofs: true,
              scan_out: true,
              scan_in: true,
            },
          });

          return {
            message: 'Data successfully retrieved',
            statusCode: 200,
            data: permission,
          };
        }

        const permission = await this.permissionRepository.find({
          where: {
            id: userId,
          },
          relations: {
            user: true,
            validated_by: true,
            proofs: true,
            scan_out: true,
            scan_in: true,
          },
        });

        return {
          message: 'Data successfully retrieved',
          statusCode: 200,
          data: permission,
        };
      }

      const permission = await this.permissionRepository.find({
        relations: {
          user: true,
          validated_by: true,
          proofs: true,
          scan_out: true,
          scan_in: true,
        },
      });

      return {
        message: 'Data successfully retrieved',
        statusCode: 200,
        data: permission,
      };
    } catch (error) {
      console.log(error);

      return {
        message: 'An error occurred',
        statusCode: 500,
        data: null,
      };
    }
  }
}
