import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Moderator } from 'src/entities/moderator.entity';
import { Igrac } from 'src/entities/igrac.entity';
import { Organizator } from 'src/entities/organizator.entity';
import { Repository } from 'typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User]), JwtModule.register({})  ],
providers: [UserService,Repository,AtStrategy,RtStrategy ],
controllers: [UserController],
exports: [UserService]
})
export class UserModule {}
