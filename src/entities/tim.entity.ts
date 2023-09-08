import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsString, Length } from "class-validator";
import { Igrac } from "./igrac.entity";
import { Turnir } from "./turnir.entity";

@Entity()
export class Tim {
    [x: string]: any;
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "naziv" })
    @IsString()
    @Length(3, 20)
    naziv: string

    @Column({ name: "mesto" })
    @IsString()
    @Length(3, 20)
    mesto: string

    @Column({ type: "integer", default: 0 })
    brojIgraca: number

    @OneToMany(() => Igrac, (igrac) => igrac.tim)
    igrac: Igrac[]

    @ManyToMany(() => Turnir, turnir => turnir.tim)
    @JoinTable({ name: "turnir_tim" })

    turnir: Turnir[]


}