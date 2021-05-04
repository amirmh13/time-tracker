import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { CreateCompanyUserDto } from './dto/create-company-user.dto';
import { UpdateCompanyUserDto } from './dto/update-company-user.dto';
import { CompanyUser } from './schemas/CompanyUser.schema';

@Injectable()
export class CompanyUserService {

    constructor(
        @InjectModel(CompanyUser.name) private companyUserModel: Model < CompanyUser > ,
    ) {}

    async createCompanyUser(createCompanyUserDto: CreateCompanyUserDto, user: any) {
        const foundedCompanyUser = await this.findCompanyUser(createCompanyUserDto.phoneNumber);

        if (foundedCompanyUser) {
            throw new HttpException('Phone number already is exists', HttpStatus.NOT_ACCEPTABLE)
        }

        const newCompanyUser = new this.companyUserModel({
            company: user._id,
            phoneNumber: createCompanyUserDto.phoneNumber
        })

        return await newCompanyUser.save();
    }

    findAll() {
        return `This action returns all companyUser`;
    }

    findOne(id: number) {
        return `This action returns a #${id} companyUser`;
    }

    update(id: number, updateCompanyUserDto: UpdateCompanyUserDto) {
        return `This action updates a #${id} companyUser`;
    }

    remove(id: number) {
        return `This action removes a #${id} companyUser`;
    }

    async findCompanyUser(phoneNumber: string) {
        const foundedCompanyUser = await this.companyUserModel.findOne({ phoneNumber });

        return foundedCompanyUser
    }
}