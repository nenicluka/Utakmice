import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsString, Length } from "class-validator";
import { User } from "./user.entity";
import { Tim } from "./tim.entity";
//import { Book } from "./book.entity";

@Entity()
export class Igrac extends User {

    @Column({ type: "integer", default: 0 })
    godine: number

    @Column()
    @IsString()
    @Length(1, 30)
    grad: string

    @ManyToOne(() => Tim, (tim) => tim.igrac)
    tim: Tim


}