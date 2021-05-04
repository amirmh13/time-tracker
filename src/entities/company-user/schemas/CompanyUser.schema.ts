import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";
import { User } from "src/entities/user/schema/User.schema";


@Schema({ timestamps: true })
export class CompanyUser extends Document {

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
    company: string;

    @Prop({ type: String, required: true })
    phoneNumber: string;
}

export const CompanyUserSchema = SchemaFactory.createForClass(CompanyUser);