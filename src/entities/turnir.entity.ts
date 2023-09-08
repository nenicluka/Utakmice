import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsString, Length } from "class-validator";
import { Organizator } from "./organizator.entity";
import { Tim } from "./tim.entity";

@Entity()
export class Turnir {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "naziv" })
    @IsString()
    @Length(2, 18)
    naziv: string

    @Column({ name: "tip" })
    @IsString()
    @Length(2, 18)
    tip: string

    @Column()
    @IsString()
    @Length(50, 2000)
    opis: string

    @Column()
    @IsString()
    @Length(1, 30)
    mesto: string

    @Column()
    datum: Date

    @Column({ type: "integer", default: 0 })
    cenaUcesca: number

    @Column({ type: "float", default: 0 })
    nagradniFond: number

    @Column({ type: "integer", default: 0 })
    brojTimova: number

    @ManyToMany(() => Organizator, (organizator) => organizator.turnir)
    organizator: Organizator[]

    @ManyToMany(() => Tim, tim => tim.turnir)

    tim: Tim[]


}