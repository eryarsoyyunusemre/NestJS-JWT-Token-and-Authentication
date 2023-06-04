import {Body, Controller, Get, Post,  Request,UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {LoginDto} from "./dto/login.dto";
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/core/guards';
import { UserLevel } from './users.enum';
import { Level } from 'src/core/decorator';
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService:UsersService
    ) {
    }


    @UseGuards(AuthGuard(), RolesGuard)
    @Level(UserLevel.ADMIN)
    @Get('admin')
    async testAdmin(@Request() req){
        return this.usersService.getUser()
    }

    @UseGuards(AuthGuard(), RolesGuard)
    @Level(UserLevel.USER)
    @Get('user')
    async testUser(@Request() req){
        return this.usersService.getUser()
    }


    @Post('login')
    async create(
        @Body('login')
            userData: LoginDto
    ) {
        return await this.usersService.login(userData)
    }


    @Post('register')
    async register(
        @Body('register')
            registerData: RegisterDto
    ) {
        return await this.usersService.register(registerData)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('decodeToken')
    async refreshToken(
        @Request() req
    ) {
       return  req.user
    }




}
