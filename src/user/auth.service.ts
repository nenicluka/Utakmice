import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { FindOneOptions, FindOptionsWhere, MoreThan, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Igrac } from 'src/entities/igrac.entity';
import { Role } from 'src/models/enums';
import { Moderator } from 'src/entities/moderator.entity';
import * as bcrypt from 'bcrypt'
import { UserSignInDto, UserSignUpDto, UserUpdatePassDto } from "./DTOs";
import { Organizator } from 'src/entities/organizator.entity';
import { Type } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, Tokens } from 'src/models/types'; 
import { jwtConstants } from './strategy/constants';

@Injectable()
export class AuthService<T extends User> {
    private jwtService: JwtService
    constructor(private readonly repository: Repository<T>) {
        this.jwtService = new JwtService()
    }

    async getAll(): Promise<T[]> {
        return await this.repository.find() as T[]
    }

    async signup(userDto: UserSignUpDto): Promise<Tokens> {
        try {
            let user: User
            switch (userDto.role) {
                case Role.Igrac:
                    user = new Igrac()
                    user.role = Role.Igrac
                    break
                case Role.Moderator:
                    user = new Moderator()
                    user.role = Role.Moderator
                    break
                case Role.Organizator:
                    user = new Organizator()
                    user.role = Role.Organizator
                default:
                    user = new Organizator()
                    user.role = Role.Organizator

            }
            user.email = userDto.email
            user.ime = userDto.ime
            user.prezime = userDto.prezime
            user.password = await bcrypt.hash(userDto.password, 10)
            await this.repository.save(user as T)

            const tokens = await this.generateTokens(user.id, user.email, user.role)
            await this.updateHashedRt(user, tokens.refresh_token)

            return tokens
         

        }
        catch (err) {
            console.log(err)
        }
    }

    async signin(credentials: UserSignInDto): Promise<Tokens> {
        const user: T = await this.repository.findOneBy({
            email: credentials.email
        } as FindOptionsWhere<T>)

        if (!user) {
            throw new ForbiddenException("User sa zadatim emailom ne postoji")
        }

        const passwordMathces = await bcrypt.compare(credentials.password, user.password)
        if (!passwordMathces) {
            throw new UnauthorizedException("Pogresna sifra")
        }

        const tokens = await this.generateTokens(user.id, user.email, user.role)
        await this.updateHashedRt(user, tokens.refresh_token)
        return tokens
    }
    

    async updatePassword({ email, oldPassword, newPassword }: UserUpdatePassDto): Promise<T> {
        try {
            const user: T = await this.repository.findOneBy({
                email
            } as FindOptionsWhere<T>)

            if (!user) {
                throw new Error("User with given email doesn't exist")
            }

            const correctPassword = await bcrypt.compare(oldPassword, user.password)
            if (!correctPassword) {
                throw new UnauthorizedException("Wrong password provided")
            }

            user.password = await bcrypt.hash(newPassword, 10)
            return await this.repository.save(user)
        }
        catch (err) {
            throw new Error(err)
        }
    }

    async logout(userId: number): Promise<void> {
        const user: T = await this.repository.findOneBy({
            id: userId
        } as FindOptionsWhere<T>)

        if (user.hashedRt) {
            user.hashedRt = null
            await this.repository.save(user)
        }
    }

    async refreshTokens(userId: number, rt: string): Promise<Tokens> {
        const user: T = await this.repository.findOneBy({
            id: userId
        } as FindOptionsWhere<T>)

        if (!user || !user.hashedRt) throw new ForbiddenException("Unauthorized!")

        const rtMatches = await bcrypt.compare(rt, user.hashedRt)
        if (!rtMatches) throw new ForbiddenException("Unauthorized!")

        const tokens = await this.generateTokens(userId, user.email, user.role)
        await this.updateHashedRt(user, tokens.refresh_token)

        return tokens
    }

    async updateHashedRt(user: User, rf: string): Promise<void> {
        user.hashedRt = await bcrypt.hash(rf, 10)
        await this.repository.save(user as T)
    }

    async generateTokens(userId: number, email: string, role: Role): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: userId,
            email,
            role
        }

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: jwtConstants.ACCESS_TOKEN_KEY,
                expiresIn: "15m"
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: jwtConstants.REFRESH_TOKEN_KEY,
                expiresIn: "7d"
            })
        ])

        return {
            access_token: at,
            refresh_token: rt
        }
    }
}