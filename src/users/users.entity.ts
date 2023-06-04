import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {UserLevel} from "./users.enum";



@Entity('deneme')
export class UsersEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar',length:50})
    username:string;

    @Column({type:'varchar',comment:'user password',length:50})
    password:string;

    @Column({type:'varchar',comment:'User level',default:UserLevel.USER})
    level:UserLevel




}