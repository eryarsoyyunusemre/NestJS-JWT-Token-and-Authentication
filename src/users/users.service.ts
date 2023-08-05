import {ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "./users.entity";
import {LoginDto} from "./dto/login.dto";
import { Repository } from 'typeorm';
import {JwtService} from "@nestjs/jwt";
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UsersService {


    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
        private readonly jwtService:JwtService
    ) {
    }

    async makeToken(user: UsersEntity) {
        const payload = {
            uuid: user.uuid,
            username: user.username,
            level: user.level
        }
        const accessToken =  this.jwtService.sign(payload)
        return {
            accessToken,
            ...payload
        }
    }

    async getUsers(){
        try {
            const user = this.userRepository.find()
            if (!user){
                throw 'Invalid User'
            }
            return user
        }catch (e){
            throw new InternalServerErrorException(e.message || e)
        }
    }

    async login(data: LoginDto) {
        try {
           const user= await this.userRepository.findOneOrFail({
                where: {
                    username: data.username,
                    password: data.password
                }
            })

                return this.makeToken(user)
        } catch (error) {
            throw new UnauthorizedException(error.message || error)
        }
    }

    async register(registerData: RegisterDto) {
        try {
            const users = await this.userRepository.findOne({
                where:{
                    username:registerData.username
                }
            })
            if (users) {
                throw 'Username is already exist'
            } else {
                const user = await this.userRepository.save( registerData.toEntity());

                return registerData;
            }

        } catch (error) {
            throw new ForbiddenException(error.message || error)
        }
    }

    async tokenUUIDcontrol(uuid: number) {
        try {
            const user = await this.userRepository.findOne({ where: { uuid } })
            if (!user)
                throw 'invalid user!'
            return this.makeToken(user)
        } catch (error) {
            throw new UnauthorizedException(error.message || error)
        }
    }


}