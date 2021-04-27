import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TimeService } from './time.service';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { JwtAuthGuard } from '../auth/auth-guards/jwt-auth.guard';

@Controller('time')
@UseGuards(JwtAuthGuard)
export class TimeController {
    constructor(private readonly timeService: TimeService) {}

    @Get()
    findAll(@Request() req: any) {
      const user = req.user;
        return this.timeService.findAllUserTimes(user._id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.timeService.remove(id);
    }

    @Get('enter')
    userEntered(@Request() req: any) {
        const user = req.user;
        return this.timeService.userEntered(user._id)
    }

    @Get('exit')
    userExit(@Request() req: any) {
        const user = req.user;
        return this.timeService.userExit(user._id)
    }
}