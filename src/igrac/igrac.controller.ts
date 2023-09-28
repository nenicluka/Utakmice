import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AuthControler} from 'src/user/auth.controller';
import { IgracService } from './igrac.service';
import { Igrac } from 'src/entities/igrac.entity';
import { Role } from 'src/models/enums';
import { Public, Roles } from 'src/custom/decorators';

@Controller('igrac')
export class IgracController extends AuthControler<Igrac>{
    constructor(private igracService: IgracService) {
        super(igracService)
    }

    @Roles(Role.Moderator, Role.Igrac,Role.Organizator)


    @Delete("/delete/:id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        await this.igracService.delete(id)
    }

    @Public()
    @Get("/getAll")
    async getAll() {
        return await this.igracService.getAll()
    }
}