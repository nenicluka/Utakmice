import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserController } from 'src/user/user.controller';
import { IgracService } from './igrac.service';
import { Igrac } from 'src/entities/igrac.entity';

@Controller('igrac')
export class IgracController extends UserController<Igrac>{
    constructor(private igracService: IgracService) {
        super(igracService)
    }

    @Delete("/delete/:id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        await this.igracService.delete(id)
    }

    @Get("/getAll")
    async getAll() {
        return await this.igracService.getAll()
    }
}