import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TimService } from './tim.service';
import { CreateTimDto } from './DTOs/CreateTimDto';
import { UpdateTimDto } from './DTOs/UpdateTimDto';
import { Tim } from 'src/entities/tim.entity';
import { Public, Roles } from 'src/custom/decorators';
import { Role } from 'src/models/enums';


@Controller('tim')
export class TimController {
    constructor(private readonly timService: TimService) { }

    @Public()
    @Get("/get/:id")
    async get(@Param("id", ParseIntPipe) id: number) {
        return await this.timService.get(id)
    }

    @Public()
    @Get("/getAll")
    async getAll() {
        return await this.timService.getAll()
    }


    @Roles(Role.Igrac)
    @Post("/create")
    async create(@Body() tim: CreateTimDto) {
        return await this.timService.create(tim)
    }

    @Roles(Role.Igrac,Role.Moderator)
    @Put("/update/:id")
    async update(@Param("id", ParseIntPipe) id: number, @Body() timDto: UpdateTimDto): Promise<Tim> {
        return await this.timService.update(id, timDto)
    }

    //@Public()
    @Roles(Role.Moderator)
    @Delete("/delete/:id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        return await this.timService.delete(id)
    }
}