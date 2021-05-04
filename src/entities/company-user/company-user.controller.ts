import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { Role } from 'src/shared/decorators';
import { UserRole } from 'src/shared/enums';
import { RoleGuard } from 'src/shared/guards/role/role.guard';
import { JwtAuthGuard } from '../auth/auth-guards/jwt-auth.guard';
import { CompanyUserService } from './company-user.service';
import { CreateCompanyUserDto } from './dto/create-company-user.dto';
import { UpdateCompanyUserDto } from './dto/update-company-user.dto';

@Controller('companyUser')
@UseGuards(JwtAuthGuard, RoleGuard)

export class CompanyUserController {
  constructor(private readonly companyUserService: CompanyUserService) {}

  @Post()
  @Role(UserRole.COMPANY)
  createCompanyUser(@Body() createCompanyUserDto: CreateCompanyUserDto, @Request() req: {user:any}) {
    const user = req.user;
    return this.companyUserService.createCompanyUser(createCompanyUserDto, user);
  }

  @Get()
  findAll() {
    return this.companyUserService.findAll();
  }

  @Get(':phoneNumber')
  findCompanyUser(@Param('phoneNumber') phoneNumber: string) {
    return this.companyUserService.findCompanyUser(phoneNumber);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyUserDto: UpdateCompanyUserDto) {
    return this.companyUserService.update(+id, updateCompanyUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyUserService.remove(+id);
  }
}
