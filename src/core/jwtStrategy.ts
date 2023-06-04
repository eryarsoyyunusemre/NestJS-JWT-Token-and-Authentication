import {Injectable, UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {defaultConf} from "../config/default";
import {UsersEntity} from "../users/users.entity";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {InjectRepository} from "@nestjs/typeorm";
import { JwtPayload } from './jwt.payload.interface';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(
        @InjectRepository(UsersEntity)
        private userRepository: Repository<UsersEntity>,
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