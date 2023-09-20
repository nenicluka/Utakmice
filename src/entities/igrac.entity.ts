import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsString, Length } from "class-validator";
import { User } from "./user.entity";
import { Tim } from "./tim.entity";

@Entity()
export class Igrac extends User {


    @ManyToOne(() => Tim, (tim) => tim.igrac)
    tim: Tim


}