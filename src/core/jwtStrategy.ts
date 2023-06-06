import {Injectable} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {UsersService} from "../users/users.service";
import { JwtPayload } from './jwt.payload.interface';
import { defaultConf } from 'src/config/default';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(
        private userService: UsersService

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: defaultConf.jwt.secret,
        })
    }

    async validate(payload: JwtPayload) {
        return await this.userService.tokenUUIDcontrol(payload.id)
    }
}