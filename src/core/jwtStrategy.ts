import {Injectable} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {UsersEntity} from "../users/users.entity";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";

import { JwtPayload } from './jwt.payload.interface';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(
        private userService: UsersService

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'SECRET',
        })
    }

    async validate(payload: JwtPayload) {
        return await this.userService.tokenUUIDcontrol(payload.id)
    }
}