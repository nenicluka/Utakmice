import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { Moderator } from 'src/entities/moderator.entity';
import { AuthControler} from 'src/user/auth.controller';
import { OrganizatorService } from './organizator.service';
import { Organizator } from 'src/entities/organizator.entity';

@Controller('organizator')
export class OrganizatorController extends AuthControler<Organizator> {
    constructor(private readonly organizatorSerivce: OrganizatorService) {
        super(organizatorSerivce)
    }
}