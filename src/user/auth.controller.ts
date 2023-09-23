import { User } from "src/entities/user.entity";
import { AuthService } from "./auth.service";
import { Body, Controller, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UserUpdatePassDto, UserSignInDto, UserSignUpDto } from "./DTOs";
import { Tokens } from "src/models/types";
import { GetCurrentUserId, Public } from "src/custom/decorators";

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

    @Post("/updatePassword")
    async updatePassword(@Body() credentials: UserUpdatePassDto): Promise<T> {
        return await this.updatePassword(credentials)
    }

    @Public()
    @Post("/refresh")
    async refreshTokens(@GetCurrentUserId() userId: number): Promise<Tokens> {
        return await this.refreshTokens(userId)
    }
}