import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRole } from 'src/shared/enums';
import { AuthService } from '../auth/auth.service';
import { CompanyUserService } from '../company-user/company-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/User.schema';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model < User > ,
        @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
        private readonly companyUserService: CompanyUserService,
    ) {}

    async register(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto);
        if (createUserDto?.role == UserRole.USER) {
            const invitedUser = await this.companyUserService.findCompanyUser(createUserDto.phoneNumber);

            if (!invitedUser) {
                throw new HttpException('You have been not invited yet!', HttpStatus.NOT_ACCEPTABLE);
            }
            newUser.company = invitedUser.toJSON().company;
        }
        const savedUser = await newUser.save();
        return this.authService.login(savedUser.toJSON())
    }

    async findAll() {
        return await this.userModel.find();
    }

    async findOneByPhoneNumber(phoneNumber: string) {
        return await this.userModel.findOne({ phoneNumber });
    }

    async findOneById(_id: string) {
        return await this.userModel.findOne({ _id });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    async remove(_id: string) {
        return await this.userModel.remove({ _id });
    }

    async getAllCompanyUsers(companyId: string) {
        console.log(companyId);
        
        const users = await this.userModel.find({ company: companyId });
        if (!users.length) {
            throw new HttpException('You are not any users yet!', HttpStatus.NOT_FOUND);
        }
        return users
    }
}