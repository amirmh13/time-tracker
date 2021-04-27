import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/entities/user/schema/User.schema";

@Schema({ timestamps: true })
export class Time extends Document {

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    owner: string;

    @Prop({ type: String })
    enterTime: string;

    @Prop({ type: String, default: null })
    exitTime ? : string;

    @Prop({ type: Boolean, default: true })
    working ? : boolean;

    @Prop()
    name ? : string;
}

export const TimeSchema = SchemaFactory.createForClass(Time);