import {IsInt, IsNumber, IsString, Length} from "class-validator"

export class CreateTimDto {
    @IsString()
    @Length(3, 20)
    naziv: string

    @IsString()
    @Length(3, 20)
    mesto: string

    @IsNumber()
    brojIgraca: number

    @IsInt({ each: true })
    igraciIds: number[]

    @IsInt({ each: true })
    naziviTurnira: number[]    
}

