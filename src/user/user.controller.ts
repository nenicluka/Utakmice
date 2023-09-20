import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { UserSignUpDto, UserSignInDto, UserUpdatePassDto } from './DTOs';
import { AuthGuard } from '@nestjs/passport';
import { Tokens } from './types';

@Controller('user')
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

    //@UseGuards(AuthGuard('jwt'))
    @Post("/signin")
    async signin(@Body() userDto: UserSignInDto): Promise<T> {
        return await this.userService.signin(userDto)
    }

    @Put("/updatePassword")
    async updatePassword(@Body() userDto: UserUpdatePassDto) {
        return await this.userService.updatePassword(userDto)
    }

}