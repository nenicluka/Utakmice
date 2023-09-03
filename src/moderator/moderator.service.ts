import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Moderator } from 'src/entities/moderator.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class ModeratorService extends UserService<Moderator>{
    constructor(@InjectRepository(Moderator) private readonly moderatorRepository: Repository<Moderator>) {
        super(moderatorRepository)
    }
}
