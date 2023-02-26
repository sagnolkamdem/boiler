import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

import { User } from "src/core/model/entity/person.entity";
import { jwtConstants } from "../auth/constants";
import { UpdateUserController } from "./update-user/update-user.controller";
import { UpdateUserService } from "./update-user/update-user.service";
import { AuthService } from "../auth/services/auth.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "365d" },
    }),
  ],
  controllers: [UserController, UpdateUserController],
  providers: [UserService, AuthService, UpdateUserService],
})
export class UserModule {}
