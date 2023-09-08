import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TurnirService } from './turnir.service';
import { CreateTurnirDto } from './DTOs/CreateTurnirDto';
import { UpdateTurnirDto } from './DTOs/UpdateTurnirDto';
import { Turnir } from 'src/entities/turnir.entity';


@Controller('turnir')
export class TurnirController {
    constructor(private readonly turnirService: TurnirService) { }

    @Get("/get/:id")
    async get(@Param("id", ParseIntPipe) id: number) {
        return await this.turnirService.get(id)
    }

    @Get("/getAll")
    async getAll() {
        return await this.turnirService.getAll()
    }

    @Post("/create")
    async create(@Body() turnir: CreateTurnirDto) {
        return await this.turnirService.create(turnir)
    }

    @Put("/update/:id")
    async update(@Param("id", ParseIntPipe) id: number, @Body() turnirDto: UpdateTurnirDto): Promise<Turnir> {
        return await this.turnirService.update(id, turnirDto)
    }

    @Delete("/delete/:id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        return await this.turnirService.delete(id)
    }
}