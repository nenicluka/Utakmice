import { IsEmail, IsEnum, IsString, Length } from "class-validator"
import { TypeOfUser } from "src/enums"

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


    @IsEnum(TypeOfUser)
    userType: TypeOfUser
}