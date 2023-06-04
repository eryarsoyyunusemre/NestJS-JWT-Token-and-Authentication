import {IsOptional, IsString} from "class-validator";
import {UsersEntity} from "../users.entity";
import {UserLevel} from "../users.enum";

export class RegisterDto {

    @IsString()
    username: string;

    @IsString()
    password: string;


    @IsOptional()
    level:UserLevel

    toEntity() {

        const entity = new UsersEntity();
        entity.username = this.username;
        entity.password = this.password;
        entity.level = this.level

        return entity;
    }


}