import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, FindOptionsWhere, MoreThan, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Igrac } from 'src/entities/igrac.entity';
import { TypeOfUser } from 'src/enums';
import { Moderator } from 'src/entities/moderator.entity';
import * as bcrypt from 'bcrypt'
import { UserSignInDto, UserSignUpDto, UserUpdatePassDto } from "./DTOs";
import { Organizator } from 'src/entities/organizator.entity';
import { Type } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';

@Injectable()
export class UserService<T extends User> {
    constructor(private readonly repository: Repository<T>
        /*,protected jwtService:JwtService*/)
    { }

    async getAll(): Promise<T[]> {
        return await this.repository.find() as T[]
    }

    async signup(userDto: UserSignUpDto): Promise<T> {
        try {
            let user: User
            switch (userDto.userType) {
                case TypeOfUser.Igrac:
                    user = new Igrac()
                    break
                case TypeOfUser.Moderator:
                    user = new Moderator()
                    break
                case TypeOfUser.Organizator:
                    user = new Organizator()
                default:
                    user = new Organizator()
            }
            user.email = userDto.email
            user.ime = userDto.ime
            user.prezime = userDto.prezime
            user.password = await bcrypt.hash(userDto.password, 10)
            return this.repository.save(user as T)
            //const tokens = await this.getTokens(user.id,user.email)
            //return tokens
        }
        catch (err) {
            console.log(err)
        }
    }

    async signin({ email, password }: UserSignInDto): Promise<T> {
        try {
            const user: T = await this.repository.findOne({
                where: {
                    email
                }
            } as FindOneOptions<T>);
            if (!user) throw new NotFoundException("Ne postoji User sa datim Emailom")
            const isPasswordValid: boolean = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) throw new Error("Pogresna sifra")
            return user
        }
        catch (err) {
            console.log(err)
        }
    }

    async updatePassword({ email, oldPassword, newPassword }: UserUpdatePassDto): Promise<T> {
        try {
            if (newPassword === oldPassword) throw Error("Nova sifra ne moze biti ista kao i stara")
            const userCredentials: UserSignInDto = new UserSignInDto()
            userCredentials.email = email
            userCredentials.password = oldPassword
            const user = await this.signin(userCredentials)
            if (!user) {
                throw new Error()
            }
            user.password = await bcrypt.hash(newPassword, 10)
            return await this.repository.save(user)
        }
        catch (err) {
            console.log(err)
        }
    }

    /*async getTokens(userId:number,email:string):Promise<Tokens>
    {
        const[at,rt]=await Promise.all(([
           this.jwtService.signAsync
           
           ({
          
                sub:userId,
                email,
        
               },
               {
                secret:'at-secret',
                expiresIn:60*15*25
            }),

            this.jwtService.signAsync
           
            ({
           
                 sub:userId,
                 email,
         
                },
                {
                 secret:'rt-secret',
                 expiresIn:60*60*24*7
             })
        ]))

        return{
            access_token:at,
            refresh_token:rt
        }
    }*/
    


}