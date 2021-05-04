import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyUserController } from './company-user.controller';
import { CompanyUserService } from './company-user.service';
import { CompanyUser, CompanyUserSchema } from './schemas/CompanyUser.schema';

@Module({
    controllers: [CompanyUserController],
    providers: [CompanyUserService],
    imports: [
        MongooseModule.forFeature([{ name: CompanyUser.name, schema: CompanyUserSchema }]),
    ],
    exports: [CompanyUserService],
})
export class CompanyUserModule {}