import { Controller, Delete, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth-guards/jwt-auth.guard';
import { TimeService } from './time.service';

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
    userEntered(@Request() req: { user: any }) {
        const user = req.user;
        return this.timeService.userEntered(user._id)
    }

    @Get('exit')
    userExit(@Request() req: { user: any }) {
        const user = req.user;
        return this.timeService.userExit(user._id)
    }

    @Get('userTimes/:id')
    getUserTimes(@Param('id') id: string) {
        return this.timeService.getUserTimes(id)
    }

    @Get('getUserBriefStatistics/:id')
    getUserBriefStatistics(@Param('id') id: string) {
        return this.timeService.getUserBriefStatistics(id)
    }
}