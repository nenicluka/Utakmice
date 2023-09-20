import { Controller } from '@nestjs/common';
import { Moderator } from 'src/entities/moderator.entity';
import { UserController } from 'src/user/user.controller';
import { ModeratorService } from './moderator.service';
import { JwtService } from '@nestjs/jwt';

@Controller('moderator')
export class ModeratorController extends UserController<Moderator> {
    constructor(private readonly moderatorSerivce: ModeratorService) {
        super(moderatorSerivce)
    }
}