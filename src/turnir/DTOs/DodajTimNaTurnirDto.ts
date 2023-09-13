import {IsInt, IsNumber, IsString, Length} from "class-validator"

export class DodajTimNaTurnirDto {

    @IsInt()
    id: number

    @IsInt({ each: true })
    timoviIDS: number[]

}

