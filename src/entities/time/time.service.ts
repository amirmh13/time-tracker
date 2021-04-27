import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTimeDto } from './dto/create-time.dto';
import { Time } from './schemas/Time.schema';

@Injectable()
export class TimeService {

    constructor(@InjectModel(Time.name) private timeModel: Model < Time > ) {}

    async userEntered(ownerId: string) {
        const workingTime = await this.timeModel.findOne({ owner: ownerId, working: true });

        if (workingTime) {
            throw new HttpException('You have already an open work time', HttpStatus.CONFLICT)
        }

        const timeDto: CreateTimeDto = {
            owner: ownerId,
            enterTime: this.getNowDate(),
        }

        const newTime = new this.timeModel(timeDto)

        return await newTime.save();
    }

    async userExit(ownerId: string) {
        let foundedTime = await this.timeModel.findOne({ owner: ownerId, working: true });

        if (!foundedTime) {
            throw new HttpException('You are not entered yet!', HttpStatus.CONFLICT)
        }

        foundedTime.exitTime = this.getNowDate();
        foundedTime.working = false;

        return await foundedTime.save();
    }

    async findAllUserTimes(ownerId: string) {
        const userTimes = await this.timeModel.find({ owner: ownerId });

        return userTimes;
    }

    async remove(_id: string) {
        const foundedTime = await this.timeModel.findOneAndRemove({ _id });

        if (!foundedTime) {
            throw new NotFoundException();
        }

        return foundedTime;
    }

    getNowDate(): string {
        return new Date().toISOString();
    }
}