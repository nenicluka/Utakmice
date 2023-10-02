import { User } from "src/entities/user.entity";
import { AuthService } from "./auth.service";
import { Body, Controller, Param, ParseIntPipe, Post, Put, Get } from "@nestjs/common";
import { UserUpdatePassDto, UserSignInDto, UserSignUpDto } from "./DTOs";
import { Tokens } from "src/models/types";
import { GetCurrentUserId, Public, Roles } from "src/custom/decorators";
import { Role } from "src/models/enums";

@Controller()
export class AuthControler<T extends User>{
    constructor(private readonly authService: AuthService<T>) { }

    @Public()
    @Post("/signup")
    async signup(@Body() credentials: UserSignUpDto): Promise<Tokens> {
        return await this.authService.signup(credentials)
    }

    @Public()
    @Post("/signin")
    async signin(@Body() credentials: UserSignInDto): Promise<Tokens> {
        return await this.authService.signin(credentials)
    }

    @Post("/logout/:userId")
    async logout(@Param("userId", ParseIntPipe) userId: number): Promise<void> {
        return await this.authService.logout(userId)
    }

    @Put("/updatePassword")
    async updatePassword(@Body() credentials: UserUpdatePassDto): Promise<UserUpdatePassDto> {
        return await this.authService.updatePassword(credentials)
    }

    @Roles(Role.Moderator, Role.Igrac,Role.Organizator)
    @Get("/getUserId/:accessToken")
    async getUserId(@Param("accessToken") accessToken: string): Promise<number> {
        return await this.authService.getUserIdFromAccessToken(accessToken)
    }
}