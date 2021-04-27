import { Module } from '@nestjs/common';
import { TimeService } from './time.service';
import { TimeController } from './time.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Time, TimeSchema } from './schemas/Time.schema';

@Module({
    controllers: [TimeController],
    providers: [TimeService],
    imports: [MongooseModule.forFeature([{ name: Time.name, schema: TimeSchema }])],
    exports: [TimeService]
})
export class TimeModule {}