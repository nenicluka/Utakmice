import { Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { UserSignUpDto, UserSignInDto, UserUpdatePassDto } from './DTOs';
import { AuthGuard } from '@nestjs/passport';

export class UserController<T extends User> {
    constructor(private readonly userService: UserService<T>) { }

    @Get("/getAll")
    async getAll(): Promise<T[]> {
        return await this.userService.getAll()
    }

    @Post("/signup")
    async signup(@Body() userDto: UserSignUpDto): Promise<T> {
        return await this.userService.signup(userDto)
    }

    //@UseGuards(AuthGuard('local'))
    @Post("/signin")
    async signin(@Body() userDto: UserSignInDto): Promise<T> {
        return await this.userService.signin(userDto)
    }

    @Put("/updatePassword")
    async updatePassword(@Body() userDto: UserUpdatePassDto) {
        return await this.userService.updatePassword(userDto)
    }

    // @Delete("/delete/:email")
    // async delete(@Param("email") email: string) {
    //     await this.userService.delete(email)
    // }

    @Delete("/deleteAll")
    async deleteAll(): Promise<void> {
        return await this.userService.deleteAll()
    }
}