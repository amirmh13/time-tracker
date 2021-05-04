import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import { Document } from "mongoose";

const saltOrRounds = 10;
const salt = bcrypt.genSaltSync(saltOrRounds);

@Schema({ timestamps: true, toJSON: { virtuals: true, versionKey: true }, id: false })
export class User extends Document {

    @Prop({ type: String, unique: true, required: true })
    phoneNumber: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String })
    first_name: string;

    @Prop({ type: String })
    last_name: string;

    @Prop({ type: Number, required: true })
    role: number;

    @Prop()
    name ? : string;

    full_name: string;

    comparePassword: (inputPassword: string, mainPassword: string) => boolean;
    hashPassword: (inputPassword: string) => string;

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre < User > ('save', async function(next) {

    let user = this;

    user.password = bcrypt.hashSync(user.password, salt)
})

UserSchema.virtual('full_name').get(function() {
    return `${this.first_name} ${this.last_name}`
})

UserSchema.methods.hashPassword = (password: string) => {
    return bcrypt.hashSync(password, salt)
}

UserSchema.methods.comparePassword = (inputPassword: string, mainPassword: string) => {
    return bcrypt.compareSync(inputPassword, mainPassword)
}