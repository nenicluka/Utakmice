import { IsEmail, IsEnum, IsString, Length } from "class-validator";
import { Role } from "src/models/enums";
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

    @Column()
    @IsEnum(Role)
    role: Role

    @Column({ nullable: true })
    hashedRt: string | null
}