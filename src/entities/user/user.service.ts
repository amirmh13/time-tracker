import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/User.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model < User > ) {}

    async register(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto);

        return await newUser.save();
    }

    async findAll() {
        return await this.userModel.find();
    }

    async findOneByEmail(email: string) {
        return await this.userModel.findOne({ email });
    }

    async findOneById(id: string) {
        return await this.userModel.findOne({ id });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    async remove(_id: string) {
        return await this.userModel.remove({ _id });
    }
}