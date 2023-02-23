import { GetAllPermissionsDTO } from './dto/get-all-permissions.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/person.entity';
import { Score } from 'src/entity/score.entity';
import { Between, Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { Proof } from 'src/entity/proof.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Proof)
    private readonly proofRepository: Repository<Proof>,
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
  ) {}

  async create(
    createPermissionDto: CreatePermissionDto,
    file: Express.Multer.File,
  ) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: createPermissionDto.user_id.toString(),
        },
      });
      if (user) {
        if (file) {
          const createProofInput = {
            file: file.filename,
            concerns: user,
          };
          const proof = await this.proofRepository.save(createProofInput);
          createPermissionDto.proof_id = proof.id;
        }
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

  async findAll(
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
      const perm = await this.userRepository.findOne({
        where: {
          id: permission.user_id,
        },
        relations: {
          permissions: {
            user: true,
            validated_by: true,
            proofs: true,
            scan_out: true,
            scan_in: true,
          },
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
        const user = await this.userRepository.find({
          where: {
            // Check if the current user is an administrator
            // role: Role.ADMIN,
            permissions: {
              createdAt: Between(startDate, endDate),
            },
          },
          relations: {
            permissions: {
              user: true,
              validated_by: true,
              proofs: true,
              scan_out: true,
              scan_in: true,
            },
          },
        });

        return {
          message: 'Data successfully retrieved',
          statusCode: 200,
          data: user,
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

      const user = await this.userRepository.find({
        relations: {
          permissions: {
            user: true,
            validated_by: true,
            proofs: true,
            scan_out: true,
            scan_in: true,
          },
        },
      });

      return {
        message: 'Data successfully retrieved',
        statusCode: 200,
        data: user,
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

  async scanOut(
    id: string,
    updatePermissionDto: any,
  ): Promise<GetAllPermissionsDTO> {
    let score: any;
    const permission = await this.permissionRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });

    const now = new Date();
    if (permission) {
      if (permission.user) {
        const createScoreInput = updatePermissionDto;
        // Condition about latitude
        const conditionOne: boolean = 4.09 > createScoreInput.latitude;
        const conditionTwo: boolean = 4.07 < createScoreInput.latitude;

        // Condition about longitude
        const conditionThree: boolean = 9.73 > createScoreInput.longitude;
        const conditionFour: boolean = 9.71 < createScoreInput.longitude;

        if (conditionOne && conditionTwo && conditionThree && conditionFour) {
          // Time server error
          const hour = now.getHours() + 1;

          // Set created score and updatedAt
          createScoreInput.createdAtDate = `${now.getFullYear()}-${
            now.getMonth() + 1
          }-${now.getDate()}`;
          createScoreInput.updatedAtDate = `${now.getFullYear()}-${
            now.getMonth() + 1
          }-${now.getDate()}`;

          createScoreInput.createdAtTime = `${hour}:${now.getMinutes()}:${now.getSeconds()}`;
          createScoreInput.updatedAtTime = `${hour}:${now.getMinutes()}:${now.getSeconds()}`;

          score = await this.scoreRepository.save(createScoreInput);

        } else {
          return {
            message: 'Score was not saved because your position is invalid.',
            statusCode: 400,
            data: null,
          };
        }
      } else {
        return {
          message: 'User not found',
          statusCode: 404,
          data: null,
        };
      }
      updatePermissionDto.out_time = score?.id;
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

  async scanIn(
    id: string,
    updatePermissionDto: any,
  ): Promise<GetAllPermissionsDTO> {
    let score: any;
    const permission = await this.permissionRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });

    const now = new Date();
    if (permission) {
      if (permission.user) {
        const createScoreInput = updatePermissionDto;
        // Condition about latitude
        const conditionOne: boolean = 4.09 > createScoreInput.latitude;
        const conditionTwo: boolean = 4.07 < createScoreInput.latitude;

        // Condition about longitude
        const conditionThree: boolean = 9.73 > createScoreInput.longitude;
        const conditionFour: boolean = 9.71 < createScoreInput.longitude;

        if (conditionOne && conditionTwo && conditionThree && conditionFour) {
          // Time server error
          const hour = now.getHours() + 1;

          // Set created score and updatedAt
          createScoreInput.createdAtDate = `${now.getFullYear()}-${
            now.getMonth() + 1
          }-${now.getDate()}`;
          createScoreInput.updatedAtDate = `${now.getFullYear()}-${
            now.getMonth() + 1
          }-${now.getDate()}`;

          createScoreInput.createdAtTime = `${hour}:${now.getMinutes()}:${now.getSeconds()}`;
          createScoreInput.updatedAtTime = `${hour}:${now.getMinutes()}:${now.getSeconds()}`;

          score = await this.scoreRepository.save(createScoreInput);
        } else {
          return {
            message: 'Score was not saved because your position is invalid.',
            statusCode: 400,
            data: null,
          };
        }
      } else {
        return {
          message: 'User not found',
          statusCode: 404,
          data: null,
        };
      }
      updatePermissionDto.in_time = score?.id;
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
}
