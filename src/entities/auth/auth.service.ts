import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { constants } from 'node:buffer';
import { User } from 'src/entities/user/schema/User.schema';
import { UserService } from 'src/entities/user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const foundedUser = await this.userService.findOneByEmail(email);

        if (foundedUser && foundedUser.comparePassword(password, foundedUser.password)) {
            const { password, ...result } = foundedUser.toJSON()
            return result
        }
        return null;
    }

    login(user: Partial < User > ) {
        const payload = { sub: user._id, email: user.email, role: user.role }
        
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}