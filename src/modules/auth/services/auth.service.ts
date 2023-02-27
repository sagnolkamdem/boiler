import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/core/model/entity/person.entity';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.UserService.validateUser(username, password);

    if (!user) {
      return null;
    } else {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: User) {
    const { password, ...result } = user;
    const payload = user ;
    return {
      access_token: this.jwtService.sign(payload),
      user: result,
    };
  }
}
