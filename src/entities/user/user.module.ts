import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CompanyUserModule } from '../company-user/company-user.module';
import { User, UserSchema } from './schema/User.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        forwardRef(() => AuthModule),
        CompanyUserModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    exports: [UserService],
})
export class UserModule {}