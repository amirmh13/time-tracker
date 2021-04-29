import { BadRequestException } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/entities/user/schema/User.schema";

@Schema({ timestamps: true })
export class Time extends Document {

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    owner: string;

    @Prop({ type: Number })
    enterTime: number;

    @Prop({ type: Number, default: null })
    exitTime ? : number;

    @Prop({ type: Boolean, default: true })
    working ? : boolean;

    @Prop({ type: Number, default: 0 })
    duration ? : number;

    @Prop()
    name ? : string;
}

export const TimeSchema = SchemaFactory.createForClass(Time);

TimeSchema.pre('save', function(next) {
    const time = this;
    
    if (!time.exitTime) {
        return next();
    }

    if (time.enterTime) {
        time.duration = time.exitTime - time.enterTime;
        return next();
    }

    throw new BadRequestException();
})