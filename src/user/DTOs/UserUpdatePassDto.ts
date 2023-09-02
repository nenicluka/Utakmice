import { IsEmail, IsString, Length } from "class-validator";

export class UserUpdatePassDto {
    @IsEmail()
    email: string

    @IsString()
    @Length(3, 20)
    oldPassword: string

    @IsString()
    @Length(3, 20)
    newPassword: string
}