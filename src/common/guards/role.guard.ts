import { Reflector } from "@nestjs/core";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { ROLE_KEY } from "../decorators/roles.decorator";
import { Role } from "src/core/model/enum/role.enum";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<Role>(ROLE_KEY, context.getHandler());

        if(!requiredRoles){
            return true;
        }

        
        const request = context.switchToHttp().getRequest();

        return requiredRoles === request.user.user.role;
    }
}