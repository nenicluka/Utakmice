import { Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, PrimaryColumn } from "typeorm";
import { IsInt, IsString, Length, Max, Min } from "class-validator";
import { Turnir } from "./turnir.entity";
import { Tim } from "./tim.entity";


@Entity()
export class Prijava {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    turnirId: number

    @Column()
    timId: number

    @Column()
    @IsInt()
    @Min(0)
    @Max(24)
    brojTimova: number

    @Column({ name: "napravljenaPrijava", default: () => "NOW()" })
    napravljenaPrijava: Date

    @Column({ name: "azuriranaPrijava", default: () => "NOW()" })
    azuriranaPrijava: Date

    @ManyToOne(() => Tim, tim => tim.turnir)
    tim: Tim

    @ManyToOne(() => Turnir, turnir => turnir.tim)
    turnir: Turnir
}