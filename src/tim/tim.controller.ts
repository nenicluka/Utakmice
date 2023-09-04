import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TimService } from './tim.service';
import { CreateTimDto } from './DTOs/CreateTimDto';
import { UpdateTimDto } from './DTOs/UpdateTimDto';
import { Tim } from 'src/entities/tim.entity';


@Controller('tim')
export class TimController {
    constructor(private readonly timService: TimService) { }

    @Get("/get/:id")
    async get(@Param("id", ParseIntPipe) id: number) {
        return await this.timService.get(id)
    }

    @Get("/getAll")
    async getAll() {
        return await this.timService.getAll()
    }

    @Post("/create")
    async create(@Body() tim: CreateTimDto) {
        return await this.timService.create(tim)
    }

    @Put("/update/:id")
    async update(@Param("id", ParseIntPipe) id: number, @Body() timDto: UpdateTimDto): Promise<Tim> {
        return await this.timService.update(id, timDto)
    }

    @Delete("/delete/:id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        return await this.timService.delete(id)
    }
}