import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './entities/user/user.module';
import { AuthModule } from './entities/auth/auth.module';
import { TimeModule } from './entities/time/time.module';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost/TimeTracker'), UserModule, AuthModule, TimeModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}