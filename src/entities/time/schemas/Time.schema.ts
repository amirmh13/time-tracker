import { BadRequestException } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/entities/user/schema/User.schema";

@Schema({ timestamps: true })
export class Time extends Document {

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    owner: string;

    @Prop({ type: [Number] })
    enterTimes: number[];

    @Prop({ type: [Number], default: null })
    exitTimes ? : number[];

    @Prop({ type: Boolean, default: true })
    working ? : boolean;

    @Prop({ type: Number, default: new Date().getTime() })
    createTime ? : number;

    @Prop({ type: Number, default: 0 })
    duration ? : number;

    @Prop()
    name ? : string;
}

export const TimeSchema = SchemaFactory.createForClass(Time);

TimeSchema.pre('save', function(next) {
    const time = this;

    const getTotalOfDuration = () => {
        let total = 0;
        time.enterTimes.forEach((el, index) => {
            total += time.exitTimes[index] - el;
        })

        return total
    }

    if (time.enterTimes.length == time.exitTimes.length) {
        time.duration = getTotalOfDuration();
        return next();
    }

    return next();
})