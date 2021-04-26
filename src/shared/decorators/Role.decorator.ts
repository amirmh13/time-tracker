import { SetMetadata } from "@nestjs/common";


export const Role = (...roles: number[]) => SetMetadata('roles', roles);