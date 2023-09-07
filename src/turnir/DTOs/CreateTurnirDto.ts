import {IsInt, IsNumber, IsString, Length} from "class-validator"

export class CreateTurnirDto {
    @IsString()
    @Length(2, 18)
    naziv: string

    @IsString()
    @Length(2, 18)
    tip: string

    @IsString()
    @Length(50, 2000)
    opis: string

    @IsString()
    @Length(2, 18)
    mesto: string

    datum: Date

    @IsNumber()
    cenaUcesca: number

    @IsNumber()
    nagradniFond: number

    @IsNumber()
    brojTimova: number

    @IsInt({ each: true })
    timoviIDS: number[]

    @IsInt({ each: true })
    organizatoriID:number[]

}

