import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Moderator } from 'src/entities/moderator.entity';
import { Organizator } from 'src/entities/organizator.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizatorService extends UserService<Organizator>{
    constructor(@InjectRepository(Organizator) private readonly organizatorRepository: Repository<Organizator>) {
        super(organizatorRepository);
    }
}