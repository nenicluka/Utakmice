import { IsEmail, IsString, Length } from "class-validator";

export class UserSignInDto {
    @IsEmail()
    email: string

    @IsString()
    @Length(3, 20)
    password: string
}