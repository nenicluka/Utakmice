import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moderator } from 'src/entities/moderator.entity';
import { User } from 'src/entities/user.entity';
import { ModeratorService } from './moderator.service';
import { ModeratorController } from './moderator.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Moderator]), TypeOrmModule.forFeature([User]),JwtModule],
    providers: [ModeratorService],
    controllers: [ModeratorController]
})
export class ModeratorModule { }