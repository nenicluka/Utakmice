import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { Moderator } from 'src/entities/moderator.entity';
import { UserController } from 'src/user/user.controller';
import { OrganizatorService } from './organizator.service';
import { Organizator } from 'src/entities/organizator.entity';

@Controller('organizator')
export class OrganizatorController extends UserController<Organizator> {
    constructor(private organizatorService: OrganizatorService) {
        super(organizatorService)
    }

}