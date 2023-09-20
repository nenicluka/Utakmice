import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { retry } from "rxjs";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor()
    {
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'at-secret',
        })

    }

    validate(payload:any){
         return payload;   
    }
}