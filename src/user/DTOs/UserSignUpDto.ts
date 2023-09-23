import { IsEmail, IsEnum, IsString, Length } from "class-validator"
import { Role } from "src/models/enums"

export class UserSignUpDto {
    @IsString()
    @Length(3, 20)
    ime: string

    @IsString()
    @Length(3, 20)
    prezime: string

    @IsEmail()
    email: string

    @IsString()
    @Length(3, 30)
    password: string

    @IsEnum(Role)
    role: Role
}