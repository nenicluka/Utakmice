import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsString, Length } from "class-validator";
import { User } from "./user.entity";
import { Turnir } from "./turnir.entity";


@Entity()
export class Organizator extends User {

    // @Column()
    // @IsString()
    // @Length(50, 2000)
    // biografija: string

    // @Column()
    // @IsString()
    // @Length(1, 30)
    // grad: string

    @ManyToMany(() => Turnir, (turnir) => turnir.organizator)
    @JoinTable({ name: "organizator_turnir" })
    turnir: Turnir[]


}