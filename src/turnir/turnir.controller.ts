import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TurnirService } from './turnir.service';
import { CreateTurnirDto } from './DTOs/CreateTurnirDto';
import { UpdateTurnirDto } from './DTOs/UpdateTurnirDto';
import { Turnir } from 'src/entities/turnir.entity';
import { DodajTimNaTurnirDto } from './DTOs';
import { Public, Roles } from 'src/custom/decorators';
import { Role } from 'src/models/enums';

@Controller('turnir')
export class TurnirController {
    constructor(private readonly turnirService: TurnirService) { }

    @Public()
    @Get("/get/:id")
    async get(@Param("id", ParseIntPipe) id: number) {
        return await this.turnirService.get(id)
    }

    @Public()
    @Get("/getAll")
    async getAll() {
        return await this.turnirService.getAll()
    }

    @Public()
    @Post("/create")
    async create(@Body() turnir: CreateTurnirDto) {
        return await this.turnirService.create(turnir)
    }

    @Public()
    @Post("/dodaj")
    async dodajTimNaTurnir(@Body() turnir: DodajTimNaTurnirDto) {
        return await this.turnirService.dodajTimNaTurnir(turnir)
    }

    @Roles(Role.Moderator,Role.Organizator)    
    @Put("/update/:id")
    async update(@Param("id", ParseIntPipe) id: number, @Body() turnirDto: UpdateTurnirDto): Promise<Turnir> {
        return await this.turnirService.update(id, turnirDto)
    }

    @Roles(Role.Moderator)
    @Delete("/delete/:id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        return await this.turnirService.delete(id)
    }
}