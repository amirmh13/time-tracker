import { Body, Controller, Delete, Get, NotAcceptableException, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/entities/auth/auth-guards/jwt-auth.guard';
import { Role } from 'src/shared/decorators';
import { UserRole } from 'src/shared/enums';
import { RoleGuard } from 'src/shared/guards/role/role.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/User.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.userService.register(createUserDto);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    findOne(@Request() user: Partial < User > ) {
        return this.userService.findOneById(user.id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id)
    }
}