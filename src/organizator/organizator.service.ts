import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Moderator } from 'src/entities/moderator.entity';
import { Organizator } from 'src/entities/organizator.entity';
import { AuthService} from 'src/user/auth.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizatorService extends AuthService<Organizator>{
    constructor(@InjectRepository(Organizator) private readonly organizatorRepository: Repository<Organizator>) {
        super(organizatorRepository)
    }
}