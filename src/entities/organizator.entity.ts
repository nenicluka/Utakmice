import { Column, Entity, JoinTable, ManyToMany} from "typeorm";
import { IsString, Length } from "class-validator";
import { User } from "./user.entity";
import { Turnir } from "./turnir.entity";


@Entity()
export class Organizator extends User {


    @ManyToMany(() => Turnir, (turnir) => turnir.organizator)
    @JoinTable({ name: "organizator_turnir" })
    turnir: Turnir[]


}