import { Controller } from '@nestjs/common';
import { Moderator } from 'src/entities/moderator.entity';
import { AuthControler} from 'src/user/auth.controller';
import { ModeratorService } from './moderator.service';
import { JwtService } from '@nestjs/jwt';

@Controller('moderator')
export class ModeratorController extends AuthControler<Moderator> {
    constructor(private readonly moderatorSerivce: ModeratorService) {
        super(moderatorSerivce)
    }
}