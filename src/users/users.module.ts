import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "./users.entity";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "../core/jwtStrategy";
import { PassportModule } from '@nestjs/passport';
import { defaultConf } from 'src/config/default';

@Module({
  imports:[TypeOrmModule.forFeature([UsersEntity]),PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: defaultConf.jwt.secret,
    }),],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy],
  exports:[PassportModule,JwtStrategy],
})
export class UsersModule {}
