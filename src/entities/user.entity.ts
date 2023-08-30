import { IsEmail, IsString, Length } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["email"])
export abstract class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "ime" })
    @IsString()
    @Length(3, 20)
    ime: string

    @Column({ name: "prezime" })
    @IsString()
    @Length(3, 20)
    prezime: string

    @Column({ name: "email" })
    @IsEmail()
    email: string

    @Column()
    @IsString()
    @Length(3, 30)
    password: string
}