import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTimeDto } from './dto/create-time.dto';
import { Time } from './schemas/Time.schema';

@Injectable()
export class TimeService {

    constructor(@InjectModel(Time.name) private timeModel: Model < Time > ) {}

    async userEntered(ownerId: string) {
        const workingTime = await this.findTime({ owner: ownerId, working: true });

        if (workingTime) throw new HttpException('You have already an open work time', HttpStatus.CONFLICT);

        const timeInToday = await this.findTimesOfToday();

        if (timeInToday) {
            timeInToday.enterTimes.push(this.getNowDate());
            timeInToday.working = true;

            return await timeInToday.save();
        }

        const timeDto: CreateTimeDto = {
            owner: ownerId,
            enterTimes: [this.getNowDate()],
        }

        const newTime = new this.timeModel(timeDto)

        return await newTime.save();
    }

    async userExit(ownerId: string) {
        let foundedTime = await this.findTime({ owner: ownerId, working: true });

        if (!foundedTime) {
            throw new HttpException('You are not entered yet!', HttpStatus.CONFLICT)
        }

        const timeInToday = await this.findTimesOfToday();

        if (timeInToday) {
            timeInToday.exitTimes.push(this.getNowDate());
            timeInToday.working = false;

            return await timeInToday.save();
        }

        foundedTime.exitTimes = [this.getNowDate()];
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

    async findTime(query: any): Promise < Time > {
        const foundedItem = await this.timeModel.findOne(query);

        return foundedItem
    }

    async findTimesOfToday() {
        const startOfTodayTimeStamp = this.getStartOfDayTimeStamp();
        const startOfTomorrowTimeStamp = this.getStartOfDayTimeStamp(1);

        const foundedItem = await this.findTime({ createTime: { $gte: startOfTodayTimeStamp, $lte: startOfTomorrowTimeStamp } });

        return foundedItem
    }

    async getUserTimes(owner: string) {
        const times = await this.timeModel.find({ owner });
        return times
    }

    async getUserBriefStatistics(owner: string) {
        const times = await this.getUserTimes(owner);

        return {
            workDuration: times.reduce((acc, c) => acc + c.duration, 0)
        }
    }

    getStartOfDayTimeStamp(day: number = 0): number {
        const today = new Date();

        return new Date(today.getFullYear(), today.getMonth() + day, today.getDay()).getTime();
    }

    getNowDate(): number {
        return new Date().getTime();
    }
}