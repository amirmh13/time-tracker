import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise < boolean > | Observable < boolean > {
        const roles = this.reflector.get < number[] > ('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        
        if (!roles) {
            return true;
        }

        return this.matchRoles(roles, user.role);
    }

    matchRoles(roles: number[], userRole: number): boolean {
        return roles.includes(userRole)
    }
}